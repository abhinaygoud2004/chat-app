const express=require('express')
const app=express();
const http=require("http");
const {Server}=require("socket.io")
const cors=require("cors")

// app.use(cors())
const server=http.createServer(app)
const path=require("path");
//connect react build
app.use(express.static(path.join(__dirname,'./build')))


const corsOptions = {
    origin: "https://abhi-chatapp.netlify.app",
    // origin:"http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));  

const io=new Server(server,{
    cors:{
        // origin:"http://localhost:3000",
        origin:"https://abhi-chatapp.netlify.app",
        methods:["GET","POST"],
    },
})

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`)
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(data);
    })
    socket.on("send_message",(data)=>{
        // socket.broadcast.emit("receive_message",data);
        socket.to(data.room).emit("receive_message",data);
    })
})


server.listen(3001,()=>{
    console.log("Server is running")
})