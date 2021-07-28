import {POST_TYPES} from "../actions/postActions";
import {DeleteData, EditData} from "../actions/alertActions"

const inititalState = {
    post: [],
    loading:false,
    results:0,
    page:0
    
}

const postReducer = (state= inititalState, action) =>{
    switch(action.type){
        case POST_TYPES.CREATE_POST:
            return{
                ...state,
                post:[ action.payload, ...state.post]
            }
        case POST_TYPES.LOADING_POSTS:
            return {
                    ...state,
                   loading : action.payload
                }
        case POST_TYPES.GET_POSTS:
            return{
                ...state,
                post: action.payload.posts,
                results :action.payload.result
                }
        case POST_TYPES.UPDATE_POST:
            return{
                 ...state,
                post: EditData(state.post, action.payload._id, action.payload),
               
                }
                case POST_TYPES.DELETE_POST:
                    return{
                         ...state,
                        post: DeleteData(state.post, action.payload._id),
                       
                        }
        
        default: 
        return state
    }
}

export default postReducer;