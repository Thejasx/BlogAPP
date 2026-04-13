import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connDb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express()
dotenv.config()
connDb()


app.use(cors())
app.use(express.json())


app.use('/api/admin',adminRoutes)



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})