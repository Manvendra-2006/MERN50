import Product from "../models/Product.js"

export async function AddToProduct(req,resp){
    try{
        const {title,description,image,stock,price,category} = req.body
        if(!title|| !description || !image || !stock || !price || !category){
            return resp.status(404).json({message:"All fields are required"})
        }
        const product = await Product.create(req.body)
        if(!product){
            return resp.status(400).json({message:"Product is not created"})
        }
        return resp.status(201).json({message:"Product is created"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error"})
    }
}
export async function getProduct(req,resp){
    try{
        const product = await Product.find()
        if(!product){
            return resp.status(404).json({message:"ProductData is not get"})
        }
        return resp.status(201).json({message:"PrductData is get"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function deleteProduct(req,resp){
    try{
        const deleteproduct = await Product.findByIdAndDelete(req.params.id)
        if(!deleteproduct){
            return resp.status(400).json({message:"Product is not delete"})
        }
        return resp.status(201).json({message:"Product is deleted"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function updateProduct(req,resp){
    try{
        const updateproduct = await Product.findByIdAndUpdate(req.params.id,req.body,{"returnDocument":"after"})
        if(updateproduct){
            return resp.status(201).json({message:"Product is updated"})
        }
        return resp.status(404).json({message:"Product is not updated"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}