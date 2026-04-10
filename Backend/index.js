import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import addressRouter from './routes/addressRoutes.js'
const app = express()
dotenv.config()
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.listen(process.env.PORT)