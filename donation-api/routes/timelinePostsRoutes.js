import express from 'express';
import { getPosts, getPostById, createPost, deletePost } from '../controllers/timelinePostControllers.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);

export default router;
