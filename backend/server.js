import express from "express";
import dotenv from 'dotenv';
import connectDB from '../backend/config/db.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import cors from 'cors'



dotenv.config();
connectDB();

const app = express();

app.use(cors()); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.get('/',(req,res) =>{
    res.send("Api is running ")

});

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000 

app.listen(5000,console.log(`server started on port ${PORT}`))
