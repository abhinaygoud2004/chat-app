import './App.css';
import io from 'socket.io-client'
import {useEffect,useState} from "react"
// const socket=io.connect("http://localhost:3001");
const socket=io.connect("//abhi-chatapp.netlify.app");


function App() {
  const [room,setRoom]=useState("");
  const [message,setMessage]=useState("")
  const [messageReceived,setMessageReceived]=useState("")

  const sendMessage=()=>{
    socket.emit("send_message",{message,room})
  }

  const joinRoom=()=>{
    if(room!==""){
      socket.emit("join_room",room);
    }
  }

  

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
     setMessageReceived(data.message);
    })
  },[])


  return (
    <div className="App">
      <input placeholder="room no" onChange={(event)=>{
        setRoom(event.target.value);
      }} />
      <button onClick={joinRoom}>Join Room</button>
     <input placeholder='Type something...' onChange={(event)=>{
      setMessage(event.target.value);
     }}/>
     <button onClick={sendMessage}>Send Message</button>
    <h1>Message:</h1>
    {messageReceived}
    </div>
  );
}

export default App;
