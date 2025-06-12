const db = require('../config/db');
const { processAndUploadImage } = require('./uploadController');

// Upload image controller
exports.uploadImage = async (req, res) => {
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, category_name } = req.body;
    const tags = JSON.parse(req.body.tags || '[]');
    const userId = req.user.id;

    if (!req.file || !title) {
      return res.status(400).json({ message: 'Image and title are required' });
    }

    const { fullUrl, previewUrl } = await processAndUploadImage(req.file, userId);

    let categoryId = null;
    if (category_name) {
      const [categoryRows] = await conn.query(
        'SELECT Category_id FROM categories WHERE Category_name = ?',
        [category_name],
      );
      if (!categoryRows.length) throw new Error(`Invalid category name: ${category_name}`);
      categoryId = categoryRows[0].Category_id;
    }

    const [result] = await conn.query(
      `INSERT INTO images (Title, Description, File_url, Preview_url, User_id, Category_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, fullUrl, previewUrl, userId, categoryId],
    );

    const imageId = result.insertId;

    for (const tagName of tags) {
      const [existing] = await conn.query(`SELECT Tag_id FROM tags WHERE Tag_name = ?`, [tagName]);
      let tagId = existing.length
        ? existing[0].Tag_id
        : (await conn.query(`INSERT INTO tags (Tag_name) VALUES (?)`, [tagName]))[0].insertId;
      await conn.query(`INSERT INTO image_tags (Image_id, Tag_id) VALUES (?, ?)`, [imageId, tagId]);
    }

    await conn.commit();
    conn.release();

    res.status(201).json({
      message: 'Image uploaded with tags successfully',
      imageUrl: fullUrl,
      previewUrl,
    });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// Get images uploaded by the authenticated user
exports.getUserImages = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [rows] = await db.query(
      `SELECT i.Image_id AS id, i.Title AS name, i.Description AS description,
              i.File_url AS fullImage, i.Preview_url AS previewImage,
              c.Category_name AS category,
              GROUP_CONCAT(t.Tag_name) AS tags
       FROM images i
       LEFT JOIN categories c ON i.Category_id = c.Category_id
       LEFT JOIN image_tags it ON i.Image_id = it.Image_id
       LEFT JOIN tags t ON it.Tag_id = t.Tag_id
       WHERE i.User_id = ?
       GROUP BY i.Image_id`,
      [req.user.id],
    );

    const images = rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      image: row.previewImage,
      fullImage: row.fullImage,
      category: row.category,
      tags: row.tags ? row.tags.split(',') : [],
    }));

    res.json({ images });
  } catch (err) {
    console.error('Error fetching user images:', err);
    res.status(500).json({ message: 'Failed to fetch user images' });
  }
};
