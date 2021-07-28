import {MESS_TYPE} from "../actions/messageActions";
import {DeleteData, EditData} from "../actions/alertActions"

const inititalState = {
    users: [],
    data:[],
    loading:false,
    resultUsers:0,
    resultData:0,
    page:0,
    firstLoad: false,
    
}


const messageReducer = (state = inititalState, action) => {
    switch(action.type){
        case MESS_TYPE.ADD_USER:
            return{
                ...state,
                users:[...state.users, action.payload]
            }
        case MESS_TYPE.ADD_MESSAGE:
                return{
                    ...state,
                    data:[...state.data, action.payload],
                    users: state.users.map( user => 
                        user._id === action.payload.recipient || user._id === action.payload.sender
                        ? {...user, text :action.payload.text, media:action.payload.media}
                        : user)
                }
                case MESS_TYPE.GET_CONVERSATION:
                    return{
                        ...state,
                        users: action.payload.newArr,
                        resultUsers:action.payload.result,
                        firstLoad:true
                    }
                    case MESS_TYPE.GET_MESSAGE:
                        return{
                            ...state,
                            data: action.payload.message,
                            resultData:action.payload.result
                        }
                        case MESS_TYPE.DELETE_MESSAGE:
                            return{
                                ...state,
                                data: action.payload.newData
                            }
        default:
            return state
    }
}


export default messageReducer;

