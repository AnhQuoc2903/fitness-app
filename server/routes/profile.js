const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const bucket = admin.storage().bucket();
const tempStorage = multer.memoryStorage();
const upload = multer({ storage: tempStorage });

const handleDelete = async (req, res) => {
  if (!req.body.name) { 
    return res.status(400).send('No image name provided.');
  }
  const imageRef = bucket.file(req.body.name);
  imageRef.delete()
    .then(() => console.log("File deleted successfully"))
    .catch((error) => console.log("Error deleting file:", error));
};

const handleUpload = async (req, res) => {
  if (!req.file) { 
    return res.status(400).send('No file uploaded.');
  }
  const metadata = {
    metadata: { firebaseStorageDownloadTokens: uuid() },
    contentType: req.file.mimetype, 
    cacheControl: 'public, max-age=31536000',
  };
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({ metadata, gzip: true });
  blobStream.on('error', (err) => res.status(500).json({ error: err }));
  blobStream.on('finish', () => res.status(201).json({ message:"Uploaded successfull" , imageUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}` }));
  blobStream.end(req.file.buffer);
};

const handleGetImages = async (req, res) => {
  const [files] = await bucket.getFiles();
  const fileUrls = files.map(file => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
  res.status(200).json(fileUrls);
};

router.post('/delete', handleDelete);
router.post('/', upload.single('image'), handleUpload);
router.get('/', handleGetImages);

module.exports = router;