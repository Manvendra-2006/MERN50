import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
export async function SignUp(req, resp) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return resp.status(404).json({ message: "All field required" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return resp.status(404).json({ message: "User already exists" })
        }
        const hashpassword = await bcrypt.hash(password, 10)
        if (!hashpassword) {
            return resp.status(404).json({ message: "Password is not hashed" })
        }
        const newUser = await User.create({
            name,
            email,
            password: hashpassword
        })

        return resp.status(201).json({ message: "User Signup successfullly", })
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}
export async function Login(req, resp) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return resp.status(404).json({ message: "All fields are required" })
        }
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return resp.status(404).json({ message: "User is not Signup" })
        }
        const match = await bcrypt.compare(password, userExists.password)
        if (!match) {
            return resp.status(404).json({ message: "Password is not matched" })
        }

        const token = jwt.sign(
            { id: userExists._id },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: '7d' }
        )
        return resp.status(201).json({ message: "Login Successfully", token })
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}

