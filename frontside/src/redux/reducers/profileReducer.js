import {PROFILE_TYPES} from '../actions/profileActions';
import {EditData} from "../actions/alertActions"
import { POST_TYPES } from '../actions/postActions';

const initialState = {
    loading: false,
    users: [],
    posts : [],
    ids:[],
    userposts:[]
}

export const profileReducer = (state = initialState , action) => {
    
    switch(action.type){
        case PROFILE_TYPES.LOADING:
            return{
                ...state,
                loading:action.payload
            }
        case PROFILE_TYPES.GET_USER:
            return{
                ...state,
                users:[...state.users, action.payload]
            }
        case PROFILE_TYPES.GET_IDS:
                return{
                    ...state,
                    ids: [...state.ids, action.payload]
                }
        case PROFILE_TYPES.USERPOSTS:
                return{
                    ...state,
                    userposts: [...state.userposts, action.payload]
                }
              
       
        case PROFILE_TYPES.FRIEND:
            return{
                ...state,
                users: EditData(state.users, action.payload._id, action.payload )
                    
            
            }
        case PROFILE_TYPES.UNFRIEND:
                return{
                    ...state,
                    users: EditData(state.users, action.payload._id, action.payload )
                }
        default:
            return state
    }
}

export default profileReducer;