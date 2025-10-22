import { ADD_PEER, REMOVE_PEER } from "../Actions/peerActions";

export type PeerState = Record<string,{stream:MediaStream}>;

type PeerAction = {
    type:typeof ADD_PEER,
    payload:{peerId:string,stream:MediaStream}
} | {
    type:typeof REMOVE_PEER,
    payload:{peerId:string}
}

export const peerReducer = (state:PeerState,action:PeerAction)=>{
    switch(action.type){
        case ADD_PEER:
            return {
                ...state,
                    [action.payload.peerId]:{
                        stream:action.payload.stream
                    }
                
            }
        case REMOVE_PEER:
            //removing a peer 
            // todo: try to write the logic

            return {...state};

        default:
            return  { ...state };
    }
}