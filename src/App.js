import './App.css';
import io from 'socket.io-client'
import {useEffect,useState} from "react"
const socket=io.connect("http://localhost:3001");


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

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageReceived(data.message);
    };
  
    socket.on("receive_message", handleReceiveMessage);
    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []); // Include 'socket' in the dependency array
  
  

  // useEffect(()=>{
  //   socket.on("receive_message",(data)=>{
  //    setMessageReceived(data.message);
  //   })
  // },[socket])


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
