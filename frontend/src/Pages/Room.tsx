import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../Context/SocketContext';

const Room:React.FC = () => {
  const {id} = useParams();
  const {socket,user} = useContext(SocketContext);


  

  useEffect(()=>{
    if(user)   {
      console.log('New user with id', user._id,"has joined the room",id);
      socket.emit("joined-room",{roomId:id,peerId:user._id});
      
    } 



  },[id,user,socket]);


    return (
    <div>Room{id}</div>
  )
}

export default Room