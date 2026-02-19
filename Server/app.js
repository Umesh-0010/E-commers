import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config({quiet:true})
import {checking_DB} from './Database/database.js'
import userRoute from './Routes/userRoutr.js'
import Products from './Routes/produstRoutes.js'
import verifyUser from './Middleware/AuthMiddleware.js'

const app = express()

app.use(express.json());
app.use(cookieParser());


await checking_DB()
const PORT = process.env.PORT

app.use('/user',userRoute)
app.use('/products', verifyUser ,Products)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})