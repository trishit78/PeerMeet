import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocketIoClient from "socket.io-client";


const WS_Server = "http://localhost:5500";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketContext =createContext<any | null>(null);

const socket= SocketIoClient(WS_Server);

interface Props{
    children:React.ReactNode
}

export const SocketProvider:React.FC<Props> = ({children}) =>{
    const navigate = useNavigate();
    
    useEffect(()=>{
        const enterRoom =({roomId}:{roomId:string})=>{
            navigate(`/room/${roomId}`)
        } 

        socket.on('room-created',enterRoom);
    },[]);
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;