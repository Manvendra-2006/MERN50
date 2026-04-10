import Cart from "../models/Cart.js";
export async function addToCart(req,resp){
    try{
        const {userId,productId} = req.body
        if(!userId || !productId){
            return resp.status(404).json({message:"All fields are required"})
        }
        const cart = await Cart.findOne({userId})
        if(!cart){
            const newCart = await Cart.create({userId,items:[{productId,quantity:1}]})
            return resp.status(201).json({message:"Cart is created",newCart})
        }
        const item = await cart.items.find((item)=> item.productId.toString() === productId.toString())
        if(item){
            item.quantity += 1;
        }
        else{
            cart.items.push({productId,quantity:1})
        }
        await cart.save()
        return resp.status(201).json({message:"Cart is created",cart})
    }

    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function getCart(req,resp){
    try{
        const {userId} = req.params
        const cart = await Cart.findOne({userId}).populate('items.productId')
        if(cart){
            return resp.status(201).json({message:"Cart is get",cart})
        }
        return resp.status(404).json({message:"Cart is not get"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}

export async function deleteCart(req,resp){
    try{
        const deletecart = await Cart.findByIdAndDelete(req.params.id)
        if(!deletecart){
            return resp.status(404).json({message:"Cart is not deleted"})
        }
        return resp.status(200).json({message:"Cart is deleted"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}

export async function updateCart(req,resp){
    try{
        const {userId,productId,quantity} = req.body
        if(!userId || !productId || !quantity){
            return resp.status(400).json({message:"All fields are required"})
        }
        const updatecart = await Cart.findOne({userId})
        if(!updatecart){            
            return resp.status(200).json({message:"Cart not found"})
        }
        const item =  updatecart.items.find((item)=> item.productId.toString() === productId.toString())
        if(item){
            item.quantity = quantity
        }
        await updatecart.save()
        return resp.status(201).json({message:"Cart is updated",updatecart})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}