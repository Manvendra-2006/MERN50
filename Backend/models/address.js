import mongoose from "mongoose";
const addressSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    fullName:{
        type:String,
        required:true
    },
    Mobile:{
        type:String,
        required:true
    },
    Pincode:{
        type:String,
        required:true
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    addressLine:{
        type:String
    }
},{
    timestamps:true
})
export default mongoose.model("Address",addressSchema)