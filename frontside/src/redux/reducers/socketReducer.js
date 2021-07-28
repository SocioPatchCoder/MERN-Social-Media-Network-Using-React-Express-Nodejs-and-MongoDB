
import {ALERT_TYPES} from '../actions/alertActions';


const socketReducer = (state= [], action) => {
    switch (action.type){
        case ALERT_TYPES.SOCKET:
            return action.payload;
        default:
            return state;
                
            
    }
}

export default socketReducer;