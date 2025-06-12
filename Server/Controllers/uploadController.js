const sharp = require('sharp');
const path = require('path');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');

const processAndUploadImage = async (file, userId) => {
  const ext = path.extname(file.originalname);
  const baseName = path.basename(file.originalname, ext);
  const timestamp = Date.now();

  const safeName = baseName.replace(/\s+/g, '-').toLowerCase();
  const originalKey = `user-${userId}/images/full/${timestamp}-${safeName}${ext}`;
  const previewKey = `user-${userId}/images/preview/${timestamp}-${safeName}-preview.jpg`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: originalKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  const previewBuffer = await sharp(file.buffer)
    .resize({ width: 600 })
    .jpeg({ quality: 60 })
    .toBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: previewKey,
      Body: previewBuffer,
      ContentType: 'image/jpeg',
    }),
  );

  return {
    fullUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${originalKey}`,
    previewUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${previewKey}`,
  };
};

module.exports = { processAndUploadImage };
