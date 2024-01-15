// Import the Express framework
const express = require('express');

// Import the file upload controller and service
const uploadController = require('../controllers/fileUpload.controller');
const upload = require('../services/fileUpload.service');

// Create an Express Router instance
const router = express.Router();

// File upload API route with middleware to upload a text file
router.post('/upload', upload.single('textFile'), uploadController.uploadFile);

module.exports = router;
