import express from 'express'
import { getAddress, saveAddress } from '../controller/addressController.js'
const addressRouter = express.Router()
addressRouter.post("/saveaddress",saveAddress)
addressRouter.get("/:userId",getAddress)
export default addressRouter