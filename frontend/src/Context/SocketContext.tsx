import Peer from "peerjs";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocketIoClient from "socket.io-client";
import {v4 as UUIDv4} from 'uuid';

const WS_Server = "http://localhost:5500";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketContext =createContext<any | null>(null);

const socket= SocketIoClient(WS_Server);

interface Props{
    children:React.ReactNode
}

export const SocketProvider:React.FC<Props> = ({children}) =>{
    const navigate = useNavigate();
    const [user,setUser] = useState<Peer>();
  
      const fetchParticipantList = ({roomId,participants}:{roomId:string,participants:string[]})=>{
            console.log('Fetch room participants');
            console.log(roomId,participants);
        }


    useEffect(()=>{
        const userId = UUIDv4();
        const newPeer = new Peer(userId);

        setUser(newPeer);
        const enterRoom =({roomId}:{roomId:string})=>{
            navigate(`/room/${roomId}`)
        } 

        socket.on('room-created',enterRoom);
        socket.on('get-users',fetchParticipantList);

       
    },[]);
    return (
        <SocketContext.Provider value={{socket,user}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;