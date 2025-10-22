import { useContext } from "react";
import SocketContext from "../Context/SocketContext";

const CreateRoom:React.FC = ()=>{
    const {socket} = useContext(SocketContext);

    const initRoom = ()=>{
        //console.log('new req to create room',socket)
        console.log('btn clicked')
        socket.emit("create-room");

    }

    return (
        <button 
        className="btn btn-secondary"
        onClick={initRoom}>
            Start a new meeting in a new room
        </button>
    )
}

export default CreateRoom;