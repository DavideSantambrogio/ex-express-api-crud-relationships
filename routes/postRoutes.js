const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Endpoint per creare un nuovo post
router.post('/posts', postController.createPost);

// Endpoint per recuperare un post tramite il suo slug
router.get('/posts/:slug', postController.getPostBySlug);

// Endpoint per recuperare tutti i post con possibilità di filtri
router.get('/posts', postController.getPosts);

// Endpoint per aggiornare un post tramite il suo slug
router.put('/posts/:slug', postController.updatePostBySlug);

// Endpoint per eliminare un post tramite il suo slug
router.delete('/posts/:slug', postController.deletePostBySlug);

module.exports = router;
