// Import the Express framework
const express = require('express');

// Import the file upload controller and service
const uploadController = require('../controllers/fileUpload.controller');
const upload = require('../services/fileUpload.service');

// Import initiate task controller
const initiateAnalysisController = require('../controllers/initiateAnalysis.controller');

// Import retrieve task controller
const retrieveAnalysisController = require('../controllers/retrieveAnalysis.controller');

// Create an Express Router instance
const router = express.Router();

// File upload API route with middleware to upload a text file
router.post('/upload', upload.single('textFile'), uploadController.uploadFile);

// Initiate Analysis API route
router.post('/initiate-task', initiateAnalysisController.initiateAnalysis);

// Retrieve Task Analysis Result API
router.post('/task-analysis-result', retrieveAnalysisController.retrieveAnalysis);

module.exports = router;
