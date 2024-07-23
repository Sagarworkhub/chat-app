import { Router } from 'express';
import { signUp, login, getUserInfo } from '../controllers/AuthController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const authRoutes = Router();

authRoutes.post('/signUp', signUp);
authRoutes.post('/login', login);
authRoutes.get('/user-info', verifyToken, getUserInfo);

export default authRoutes;
