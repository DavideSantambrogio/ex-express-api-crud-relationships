const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validateData = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');
const { postValidation } = require('../validations/postValidation');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Endpoint per creare un nuovo post
router.post('/', [
    body('title').notEmpty().withMessage(postValidation.title.notEmpty.errorMessage).isString().withMessage(postValidation.title.isString.errorMessage),
    body('content').notEmpty().withMessage(postValidation.content.notEmpty.errorMessage),
    body('published').isBoolean().withMessage(postValidation.published.isBoolean.errorMessage),
    body('categoryId').isInt().custom(async (value) => {
        const category = await prisma.category.findUnique({ where: { id: value } });
        if (!category) {
            throw new Error('La categoria specificata non esiste.');
        }
        return true;
    }),
    validateData
], postController.createPost);

// Endpoint per ottenere tutti i post
router.get('/', postController.getPosts);

module.exports = router;
