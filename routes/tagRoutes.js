const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Rotte per i tags
router.post('/', tagController.createTag);
router.get('/', tagController.getTags);
router.get('/:id', tagController.getTagById);
router.put('/:id', tagController.updateTagById);
router.delete('/:id', tagController.deleteTagById);

module.exports = router;
