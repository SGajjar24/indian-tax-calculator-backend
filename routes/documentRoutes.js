/**
 * Document Routes for handling document uploads and processing
 */

const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Route for uploading documents
router.post('/upload', documentController.uploadDocument);

// Route for processing documents with Gemini AI
router.post('/process', documentController.processDocument);

module.exports = router;
