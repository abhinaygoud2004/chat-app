import './App.css';
import io from 'socket.io-client'
import {useEffect,useState} from "react"
// const socket=io.connect("http://localhost:3001");
// const socket=io.connect("https://abhi-chatapp.netlify.app");
const socket=io.connect("/");

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
    <div className="app-container">
      <div className="content-container">
        <div className="join-container">
          <input
            placeholder="Enter room number"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
        <div className="input-container">
            <input
              placeholder="Type something..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
          </div>
        <div className="chat-container">
          <div className="message-container">
            <h1>Received Message:</h1>
            <p>{messageReceived}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;