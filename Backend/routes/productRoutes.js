import express from 'express'
import { AddToProduct, deleteProduct, getProduct, updateProduct } from '../controller/productController.js'
const productRouter = express.Router()
productRouter.get("/",getProduct)
productRouter.post("/addproduct",AddToProduct)
productRouter.delete('/delete/:id',deleteProduct)
productRouter.put("/update/:id",updateProduct)
export default productRouter