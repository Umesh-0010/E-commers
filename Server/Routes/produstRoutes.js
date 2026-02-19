import express from 'express'
import { pool } from "../Database/database.js";
import {getProduct, addToCard} from '../Controllers/productController.js'
import verifyUser from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.get("/", getProduct)

router.post('/addToCart',verifyUser, addToCard)

export default router

