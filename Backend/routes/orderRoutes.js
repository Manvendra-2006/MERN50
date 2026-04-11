import express from 'express'
import { orderController } from '../controller/orderController.js'
const orderRouter = express.Router()
orderRouter.post("/order-placed",orderController)
export default orderRouter