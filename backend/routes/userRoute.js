import express from 'express';
import { adminLogin, loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', authUser, getUserProfile);
userRouter.post('/update-profile', authUser, updateUserProfile);

export default userRouter;