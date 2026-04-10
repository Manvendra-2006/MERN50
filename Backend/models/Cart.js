import mongoose from "mongoose";
import Product from "./Product.js";
import User from "./User.js";
const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Product"
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ]
},{
    timestamps:true
})
export default mongoose.model("Cart",cartSchema)