import express from 'express'
import { Login, SignUp } from '../controller/authController.js'
const authRouter = express.Router()
authRouter.post("/signup",SignUp)
authRouter.post("/login",Login)
export default authRouter