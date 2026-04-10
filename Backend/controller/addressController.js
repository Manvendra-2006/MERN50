import address from "../models/address.js"
export async function saveAddress(req,resp){
    try{
        const {userId,fullName,Mobile,state,Pincode,city,addressLine} = req.body
        if(!fullName || !Mobile || !state || !Pincode || !city || !addressLine || !userId){
            return resp.status(400).json({message:"All fields are required"})
        }
        await address.create({
            userId,
            fullName,
            state,
            city,
            Pincode,
            addressLine,
            Mobile
        })
        return resp.status(201).json({message:"Address created"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function getAddress(req,resp){
    try{
        const {userId} = req.params
        const Address = await address.find({userId})
        if(Address){
            return resp.status(201).json({message:"Address is get",Address})
        }
        return resp.status(404).json({message:"Address is not get"})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}