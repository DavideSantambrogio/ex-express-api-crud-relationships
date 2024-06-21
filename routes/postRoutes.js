const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validateData = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');
const { postValidation } = require('../validations/postValidation');

// Endpoint per creare un nuovo post
router.post('/', [
    body('title').notEmpty().withMessage(postValidation.title.notEmpty.errorMessage).isString().withMessage(postValidation.title.isString.errorMessage),
    body('content').notEmpty().withMessage(postValidation.content.notEmpty.errorMessage),
    body('published').isBoolean().withMessage(postValidation.published.isBoolean.errorMessage),
    body('categoryId').isInt().custom(async (value) => {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
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

// Endpoint per ottenere un singolo post tramite slug
router.get('/:slug', postController.getPostBySlug);

// Endpoint per aggiornare un post tramite slug
router.put('/:slug', [
    body('title').notEmpty().withMessage(postValidation.title.notEmpty.errorMessage).isString().withMessage(postValidation.title.isString.errorMessage),
    body('content').notEmpty().withMessage(postValidation.content.notEmpty.errorMessage),
    body('published').isBoolean().withMessage(postValidation.published.isBoolean.errorMessage),
    body('categoryId').isInt().custom(async (value) => {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        const category = await prisma.category.findUnique({ where: { id: value } });
        if (!category) {
            throw new Error('La categoria specificata non esiste.');
        }
        return true;
    }),
    validateData
], postController.updatePostBySlug);

// Endpoint per eliminare un post tramite ID
router.delete('/:id', postController.deletePostById);

module.exports = router;
