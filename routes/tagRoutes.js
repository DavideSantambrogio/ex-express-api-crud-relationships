const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Endpoint per creare un nuovo tag
router.post('/', tagController.createTag);

module.exports = router;