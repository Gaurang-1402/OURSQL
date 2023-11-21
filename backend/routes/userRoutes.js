import express from 'express';
import { loginUser, registerUser, logoutUser, getUserProfile } from '../controllers/userControllers.js';
import { protect, admin } from '../utils/authMiddleware.js';

    
const router = express.Router();

router.route('/').post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/login').post(loginUser);
router.route('/profile').get(protect, getUserProfile);

export default router;