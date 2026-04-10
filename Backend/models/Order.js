import mongoose from "mongoose";
import User from "./User.js"
import Product from "./Product.js"
const orderSchema = mongoose.Schema({
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
            quantity:Number,
            price:Number
        }
    ],
    address:{
        fullName:String,
        Mobile:String,
        Pincode:String,
        state:String,
        addressLine:String, 
        city:String
    },
    totalAmount:Number,
    paymentMethod:{
        type:String,
        default:'COD'
    },
    status:{
        type:String,
        default:"Placed"
    }
},{
    timestamps:true
})
export default mongoose.model("Order",orderSchema)