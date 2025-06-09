const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Middlewares/authMiddleware');
const upload = require('../Middlewares/upload');
const db = require('../config/db'); // MySQL pool

router.post('/upload', authenticateUser, upload.single('image'), async (req, res) => {
  console.log('inside Upload endpoint');
  console.log('req.user:', req.user);
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, category_name } = req.body;
    const tags = JSON.parse(req.body.tags || '[]'); // Expecting tags as JSON array
    const userId = req.user.id;

    if (!req.file || !title) {
      return res.status(400).json({ message: 'Image and title are required' });
    }

    const fileUrl = req.file.location;

    // 🔍 Get actual category ID if a name was passed
    let categoryId = null;

    if (category_name) {
      const [categoryRows] = await conn.query(
        'SELECT Category_id FROM categories WHERE Category_name = ?',
        [category_name],
      );

      if (!categoryRows.length) {
        throw new Error(`Invalid category name: ${category_name}`);
      }

      categoryId = categoryRows[0].Category_id;
    }

    // 1. Insert into images table
    const [result] = await conn.query(
      `INSERT INTO images (Title, Description, File_url, User_id, Category_id)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, fileUrl, userId, categoryId],
    );

    const imageId = result.insertId;

    // 2. Handle tags (insert if not exist, then link)
    for (const tagName of tags) {
      const [existing] = await conn.query(`SELECT Tag_id FROM tags WHERE Tag_name = ?`, [tagName]);

      let tagId;
      if (existing.length > 0) {
        tagId = existing[0].Tag_id;
      } else {
        const [tagResult] = await conn.query(`INSERT INTO tags (Tag_name) VALUES (?)`, [tagName]);
        tagId = tagResult.insertId;
      }

      await conn.query(`INSERT INTO image_tags (Image_id, Tag_id) VALUES (?, ?)`, [imageId, tagId]);
    }

    await conn.commit();
    conn.release();

    res.status(201).json({
      message: 'Image uploaded with tags successfully',
      imageUrl: fileUrl,
    });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
