import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connDb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express()
connDb()


app.use(cors())
app.use(express.json())


app.use('/api/admin',adminRoutes)
app.use('/api/blog',blogRouter)



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})