import express from 'express';
import { adminSignUp, adminSignIn } from '../Controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/sign-up', adminSignUp);
adminRouter.post('/sign-in', adminSignIn);

export default adminRouter;
