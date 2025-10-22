import {Socket} from "socket.io";

import {v4 as UUIDv4} from "uuid"; 
import type IRoomParams from "../interfaces/IRoomParams.js";
const rooms:Record<string,string[]>= {}

const roomHandler = (socket:Socket)=>{
    
    
    const createRoom = ()=>{
        const roomId = UUIDv4(); // unique room id -> for multiple connection will exchange
        rooms[roomId]= [];
        socket.join(roomId);   // socket conn to enter a new room
        socket.emit('room-created',{roomId});  // emiting an event from server side that socket conn has been added to a room -> SFU created by node server
        console.log("room created with room id",roomId);
    

        // logging users for testing
      
    }

    const joinedRoom = ({roomId,peerId}:IRoomParams)=>{
        console.log('joined room called',rooms)
        if(rooms[roomId]){
            console.log(`New user has joined room ${roomId} with peer id -> ${peerId}`);
            rooms[roomId].push(peerId);
            socket.join(roomId);
        
        
          socket.emit('get-users',{
            roomId,
            participants:rooms[roomId]
        })
        }
        
    }
    socket.on("create-room",createRoom);
    socket.on("joined-room",joinedRoom);

}

export default roomHandler;