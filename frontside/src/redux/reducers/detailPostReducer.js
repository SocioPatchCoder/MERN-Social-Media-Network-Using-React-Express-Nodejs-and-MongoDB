import {ALERT_TYPES, EditData} from '../actions/alertActions';
import { POST_TYPES } from '../actions/postActions';


const detailPostReducer = (state= [], action) => {
    switch (action.type){
        case POST_TYPES.GET_POST:
            return [...state, action.payload];
            case POST_TYPES.UPDATE_POST:
            return EditData(state, action.payload._id, action.payload);
        default:
            return state;
                
            
    }
}

export default detailPostReducer;