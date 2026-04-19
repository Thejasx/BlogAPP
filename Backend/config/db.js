import mongoose from "mongoose";

const connDb =async ()=>{
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'))
        mongoose.connection.on('error', (err) => console.log(`Database Connection Error: ${err}`))

        await mongoose.connect(`${process.env.MONGODB_URI}/blogApp`)
        
    } catch (error) {
        console.log(`Database connection error: ${error.message}`)
    }
}

export default connDb;