import express from 'express'
import {getProduct, addToCard, getCart, removeProduct} from '../Controllers/productController.js'


const router = express.Router();

router.get("/", getProduct)

router.post('/addToCart', addToCard)

router.get('/cart', getCart)

router.delete('/removeProduct', removeProduct)



export default router

