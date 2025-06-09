const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3 = require('../config/s3');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const safeName = baseName.replace(/\s+/g, '-').toLowerCase();
      const fileName = `user-${req.user.id}/images/${Date.now()}-${safeName}${ext}`;
      cb(null, fileName);
    },
  }),
});

module.exports = upload;
