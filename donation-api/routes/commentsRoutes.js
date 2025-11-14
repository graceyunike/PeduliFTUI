import express from 'express';
import { getComments, getCommentById, createComment, deleteComment } from '../controllers/commentsControllers.js';

const router = express.Router();

router.get('/', getComments);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.delete('/:id', deleteComment);

export default router;
