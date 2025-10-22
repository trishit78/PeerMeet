import Peer from "peerjs";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocketIoClient from "socket.io-client";
import {v4 as UUIDv4} from 'uuid';
import { peerReducer } from "../Reducers/peerReducer";
import { addPeerAction } from "../Actions/peerActions";

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
    const [stream,setStream] = useState<MediaStream>();

    const [peers,dispatch] = useReducer(peerReducer,{});   //peers -> state
      const fetchParticipantList = ({roomId,participants}:{roomId:string,participants:string[]})=>{
            console.log('Fetch room participants');
            console.log(roomId,participants);
        }

        const fetchUserFeed = async() =>{
            const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
            setStream(stream)
       
        }



    useEffect(()=>{
        const userId = UUIDv4();
        const newPeer = new Peer(userId,{
            host:"localhost",
            port:9000,
            path:'/myapp'
        });

        setUser(newPeer);

        fetchUserFeed();
        const enterRoom =({roomId}:{roomId:string})=>{
            navigate(`/room/${roomId}`)
        } 

        socket.on('room-created',enterRoom);
        socket.on('get-users',fetchParticipantList);

       
    },[]);

    useEffect(()=>{
        if(!user || !stream) return;
        socket.on("user-joined",({peerId})=>{
          const call = user.call(peerId,stream);
            console.log('calling the new peer',peerId);
            call.on("stream",()=>{
                dispatch(addPeerAction(call.peer,stream));
            })
        })

        user.on('call',(call)=>{
            console.log('recieving a call');
            call.answer(stream);
            call.on("stream",()=>{
                dispatch(addPeerAction(call.peer,stream));
            })
        })

        socket.emit("ready");
    },[user,stream]);   
    return (
        <SocketContext.Provider value={{socket,user,stream,peers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;