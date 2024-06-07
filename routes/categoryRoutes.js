const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Endpoint per creare una nuova categoria
router.post('/', categoryController.createCategory);

module.exports = router;