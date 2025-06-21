const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Middlewares/authMiddleware');
const upload = require('../Middlewares/upload');
const {
  uploadImage,
  getUserImages,
  getImages,
  getNewImages,
} = require('../Controllers/imageController');

router.post('/upload', authenticateUser, upload.single('image'), uploadImage);
router.get('/my-images', authenticateUser, getUserImages);
router.get('/all-images', getImages);
router.get('/new-images', getNewImages);
module.exports = router;
