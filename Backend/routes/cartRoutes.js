import express from 'express'
import { addToCart, deleteCart, getCart, updateCart } from '../controller/cartController.js'
const cartRouter = express.Router()
cartRouter.get("/:userId",getCart)
cartRouter.post("/addcart",addToCart)
cartRouter.delete("/delete/:id",deleteCart)
cartRouter.put("/update",updateCart)
export default cartRouter