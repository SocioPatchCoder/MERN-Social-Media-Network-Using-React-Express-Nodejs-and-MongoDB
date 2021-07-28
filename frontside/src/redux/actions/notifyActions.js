import {getDataApi, postDataApi , patchDataApi, deleteDataApi} from "../../utils/fetchDataApi";

export const NOTIFY_TYPES = {
    GET_NOTIFIES:"GET_NOTIFIES",
    CREATE_NOTIFIES:"CREATE_NOTIFIES",
    REMOVE_NOTIFIES:"REMOVE_NOTIFIES",
    UPDATE_NOTIFIES: "UPDATE_NOTIFIES",
    DELETE_NOTIFIES:"DELETE_NOTIFIES"

}
export const createNotify = ({msg, auth, socket}) => async (dispatch) =>{
    try {
        const res = await postDataApi('notify', msg, auth.token)
        socket.emit('createNotify', {
            ...res.data.notify,
            user:{
            fullname: auth.user.fullname,
            avatar:auth.user.avatar
            }
        })
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: "Do not"
            }
        })
    }
}

export const removeNotify = ({msg, auth, socket}) => async (dispatch) =>{
    try {
        const res = await deleteDataApi(`notify/${msg.id}?url=${msg.url}`, auth.token)
        socket.emit('removeNotify', msg)

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: "Do not"
            }
        })
    }
}

export const getNotify = (auth) => async (dispatch) =>{
    try {
        const res = await getDataApi(`notifies`, auth.token)
       dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies})
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: "Do not"
            }
        })
    }
}

export const readnotify = ({dt , auth}) => async (dispatch) => {
 dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFIES, payload: {...dt, isRead: true}})
 try {
     const res= await patchDataApi(`isreadnotify/${dt._id}`, null, auth.token)

 } catch (error) {
    dispatch({
        type:'ALERT',
        payload:{
            error: "Do not"
        }
    })
 }
}


export const deleteNotifiesAll = ( auth ) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.DELETE_NOTIFIES, payload: [] })
    try {
        const res = await deleteDataApi(`deleteallnotify`,  auth.token)
   
    } catch (error) {
       dispatch({
           type:'ALERT',
           payload:{
               error: "Do not"
           }
       })
    }
   }