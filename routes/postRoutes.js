const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validateData = require('../middlewares/validationMiddleware')

// Endpoint per creare un nuovo post
router.post('/posts', validateData, postController.createPost);

// Endpoint per recuperare un post tramite il suo slug
router.get('/posts/:slug', validateData, postController.getPostBySlug);

// Endpoint per recuperare tutti i post con possibilità di filtri
router.get('/posts', validateData, postController.getPosts);

// Endpoint per aggiornare un post tramite il suo slug
router.put('/posts/:slug', validateData, postController.updatePostBySlug);

// Endpoint per eliminare un post tramite il suo slug
router.delete('/posts/:slug', validateData, postController.deletePostBySlug);

module.exports = router;
