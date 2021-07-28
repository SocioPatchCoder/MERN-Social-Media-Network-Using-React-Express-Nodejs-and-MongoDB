import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import profile from './profileReducer';
import homePost from './postReducer';
import status from './statusReducer'
import detailPost from './detailPostReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'

export default combineReducers({
auth,
alert,
profile,
homePost,
status,
detailPost,
socket,
notify,
message
});