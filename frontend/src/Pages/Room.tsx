import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../Context/SocketContext';
import UserFeedPlayer from '../Components/UserFeedPlayer';


const Room:React.FC = () => {
  const {id} = useParams();
  const {socket,user,stream,peers} = useContext(SocketContext);
  useEffect(()=>{
    if(user)   {
      console.log('New user with id', user._id,"has joined the room",id);
      socket.emit("joined-room",{roomId:id,peerId:user._id});
      
    } 
    console.log('Peers',peers)

  },[id,user,socket,peers]);


    return (
    <div>
      Room{id}
      Your own user feed
      <UserFeedPlayer stream={stream} />
      <div>
        Other users feed
      {
        Object.keys(peers).map((peerId)=>(
          <>
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream} ></UserFeedPlayer> 
          </>
        ))
      }

      </div>


      </div>
  )
}

export default Room