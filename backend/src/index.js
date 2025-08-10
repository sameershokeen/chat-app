import express from 'express';
import authroutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectDB } from './lib/db.js'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173'
  ,credentials:true
}))


app.use("/api/auth",authroutes);
app.use("/api/messages",messageRoutes)



app.listen(process.env.PORT || 5173, () => {
  console.log('Server is running on port 3000');
connectDB()
});