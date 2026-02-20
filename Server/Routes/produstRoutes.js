import express from 'express'
import {getProduct, addToCard} from '../Controllers/productController.js'
import verifyUser from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.get("/", getProduct)

router.post('/addToCart', addToCard)

export default router

