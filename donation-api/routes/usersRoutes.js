import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changePassword
} from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.post('/:id/change-password', changePassword);
router.delete('/:id', deleteUser);

export default router;