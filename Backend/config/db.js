import mongoose from "mongoose";

const connDb =async ()=>{
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connected successfully')
        
    } catch (error) {

        console.log(error.message)
        
    }
}

export default connDb;