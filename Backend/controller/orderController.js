import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
export async function orderController(req,resp){
    try{
        const {userId,address} = req.body
        if(!userId || !address){
            return resp.status(404).json({message:"All fields are required"})
        }
        const cart = await Cart.findOne({userId}).populate("items.productId")
        if(!cart || cart.items.length==0){
            return resp.status(404).json({message:"Cart is empty"})
        }
        const orderItems =  cart.items.map((item=>({
            productId:item.productId._id,
            quantity:item.quantity,
            price:item.productId.price
        })))
        const totalAmount = await orderItems.reduce((sum,item)=> sum+(item.quantity * item.price),0)
        for(let item of cart.items){
            await Product.findByIdAndUpdate(item.productId._id,{$inc:{stock:-item.quantity}})
        }
       const order= await Order.create({
            userId,
            items:orderItems,
            address,
            totalAmount,
            paymentMethod:"COD",            
        })
        return resp.status(201).json({message:"Order is placed successfully",order:order._id})
        }   
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}