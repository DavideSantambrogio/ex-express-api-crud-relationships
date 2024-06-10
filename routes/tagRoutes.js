const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const validateData = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');
const { tagValidation } = require('../validations/tagValidation');

// Endpoint per creare un nuovo tag
router.post('/', [
    body('name').notEmpty().withMessage(tagValidation.name.notEmpty.errorMessage).isString().withMessage(tagValidation.name.isString.errorMessage).isLength({ min: 3 }).withMessage(tagValidation.name.isLength.errorMessage),
    validateData // Middleware per eseguire la validazione
], tagController.createTag);



module.exports = router;
