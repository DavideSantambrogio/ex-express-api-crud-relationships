const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validateData = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');
const { categoryValidation } = require('../validations/categoryValidation');

// Endpoint per creare una nuova categoria
router.post('/', [
    body('name').notEmpty().withMessage(categoryValidation.name.notEmpty.errorMessage).isString().withMessage(categoryValidation.name.isString.errorMessage).isLength({ min: 3 }).withMessage(categoryValidation.name.isLength.errorMessage),
    validateData // Middleware per eseguire la validazione
], categoryController.createCategory);



module.exports = router;
