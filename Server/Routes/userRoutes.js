import express from 'express';
import { userSignUp, userSignIn } from '../Controller/userController.js';

const userRouter = express.Router();

userRouter.post('/sign-up', userSignUp);
userRouter.post('/sign-in', userSignIn);

export default userRouter;
