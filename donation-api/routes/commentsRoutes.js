import express from 'express';
import { getComments, getCommentById, getCommentsByPostId, createComment, deleteComment, getTrustStats } from '../controllers/commentsControllers.js';

const router = express.Router();

router.get('/', getComments);
router.get('/post/:postId', getCommentsByPostId);
router.get('/trust/stats', getTrustStats);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.delete('/:id', deleteComment);

export default router;
