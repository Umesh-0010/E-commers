import express from 'express'
import {getProduct, addToCard, getCart} from '../Controllers/productController.js'


const router = express.Router();

router.get("/", getProduct)

router.post('/addToCart', addToCard)

router.get('/cart', getCart)


export default router

