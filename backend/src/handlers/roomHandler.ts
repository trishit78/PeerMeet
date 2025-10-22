import {Socket} from "socket.io";

import {v4 as UUIDv4} from "uuid"; 

const roomHandler = (socket:Socket)=>{
    const createRoom = ()=>{
        const roomId = UUIDv4(); // unique room id -> for multiple connection will exchange
        socket.join(roomId);   // socket conn to enter a new room
        socket.emit('room-created',{roomId});  // emiting an event from server side that socket conn has been added to a room -> SFU created by node server
        console.log("room created with room id",roomId);
    
    }

    const joinedRoom = ({roomId}:{roomId:string})=>{
        console.log(`New user has joined room ${roomId}`);
    }
    socket.on("create-room",createRoom);
    socket.on("joined-room",joinedRoom);

}

export default roomHandler;