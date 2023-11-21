import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, getUserById } from '../controllers/userControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

    
const router = express.Router();

router.route('/').post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id').get(protect, admin, getUserById);

export default router;