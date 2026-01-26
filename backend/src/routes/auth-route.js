import express from 'express';

import { signup, login, logout, checkAuth, updateProfileImage } from '../controllers/auth-controller.js';
import protectRoute from "../middlewares/auth-middleware.js"

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile-image', protectRoute, updateProfileImage)
router.get('/check-auth', protectRoute, checkAuth);

export default router;