import { Router } from 'express';
import { deleteSessionsByEmail, verifyUserSession } from '../middlewares';
import * as authController from '../controllers/auth';

const authRoutes: Router = Router();

authRoutes.post('/login', deleteSessionsByEmail, authController.signIn);
authRoutes.post('/register', authController.signUp);
authRoutes.delete('/logout', verifyUserSession, authController.signOut);

export default authRoutes;