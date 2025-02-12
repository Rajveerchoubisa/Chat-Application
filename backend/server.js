import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import { Server } from "socket.io";
import path from 'path'

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running ");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
  
// Deployment code
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname1,'/frontend/build')))

    app.get('*',(req,res) => {
      res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    });
}else {
  app.get("/", (req, res) => {
    res.send("Api is running ");
  });
}


//deployment

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat',(room) => {
    socket.join(room);
    console.log("user joined:" + room);
    
  });

  socket.on('typing' ,(room) => socket.in(room).emit("typing"))
  socket.on('stop typing' ,(room) => socket.in(room).emit("stop typing"))
  

  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if(!chat.users) return console.log("chat.users not defined");

     chat.users.forEach(user =>{
        if(user._id == newMessageReceived.sender._id) return;

        socket.in(user._id).emit("message received",newMessageReceived);
     });

  });

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  })
});
