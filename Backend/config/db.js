import mongoose from "mongoose";
async function connectDB(){
    await mongoose.connect(process.env.URL)
    console.log("Data Base is connected")
}
export default connectDB