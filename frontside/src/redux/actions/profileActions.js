import { DeleteData} from "./alertActions"
import {getDataApi, patchDataApi} from '../../utils/fetchDataApi'
import {imageupload} from "../../utils/imageupload"
import axios from "axios";
import {createNotify, removeNotify} from "./notifyActions"

export const PROFILE_TYPES = {
    LOADING : 'LOADING',
    GET_USER : 'GET_USER',
    FRIEND:'FRIEND',
    UNFRIEND:'UNFRIEND',
    GET_IDS:"GET_IDS",
    USERPOSTS:"USERPOSTS"

}

export const getProfileUsers = ({users,id, auth}) => async (dispatch) =>{
    if(users.every(item => item._id !== id)){
           try {
            dispatch({type: PROFILE_TYPES.LOADING, payload:{loading:true}})
            const res =  await getDataApi(`user/${id}`, auth.token)
      

            const user = res;
          
           
         
            console.log(user)
            
            dispatch({
                type:PROFILE_TYPES.GET_USER,
                payload:user.data.user
            })
           
            dispatch({type: PROFILE_TYPES.LOADING, payload:{loading:false}})
            
        } catch (err) {
            dispatch({
                type:'ALERT',
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }
}
export const getProfileUsersPost = ({profil,id, auth}) => async (dispatch) =>{
    if(profil.every(item => item._id !== id)){
    //  dispatch({type:PROFILE_TYPES.GET_IDS , payload: id })
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload:{loading:true}})
            
            const res1 = await getDataApi(`userposts/${id}`,auth.token)

           
            const posts = res1;
           
         
      
            
         
            dispatch({
                type:PROFILE_TYPES.USERPOSTS,
                payload: {...posts.data, _id:id}
            })
            dispatch({type: PROFILE_TYPES.LOADING, payload:{loading:false}})
            
        } catch (err) {
            dispatch({
                type:'ALERT',
                payload:{
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const updateProfile = ({editData,avatar, auth}) =>async (dispatch) =>{
    if(!editData.fullname) return dispatch({type:"ALERT", payload:{error:"Add you fullname"}})
    if(editData.fullname.length > 25) return dispatch({type:"ALERT", payload:{error:"Fullname tooo long"}})
    if(editData.story.length >200) return dispatch({type:"ALERT", payload:{error:"story too long"}})

    try {
        let media;

        dispatch({type:"ALERT", payload : {loading: true}})
        if(avatar) media = await imageupload([avatar])

        const res = await axios.patch("http://localhost:5000/api/user", {
            ...editData,
            avatar: avatar ? media[0].secure_url  : auth.user.avatar  
        },
        {
            headers : {Authorization: auth.token}
         } )
         
         
        dispatch({
            type:'AUTH',
            payload: {
                    ...auth,
                    user:{
                        ...auth.user,
                        ...editData,
                        avatar: avatar ? media[0].secure_url : auth.user.avatar
                    }
            }
        })

        dispatch({type:"ALERT", payload : {loading: false}})
        
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}

export const addfriends = ({users, user, auth,socket}) => async (dispatch) =>{
let newUser;
if(users.every(item => item._id !== user._id)){
    newUser = {...user, friends:[...user.friends, auth.user]}
}else {
    users.forEach(item =>{
        if(item._id === user._id){
            newUser = {...item, friends:[...item.friends, auth.user]}
        }
    })
}


    
   
    dispatch({
        type: PROFILE_TYPES.FRIEND,
        payload:newUser
        
    })

    dispatch ({
        type:'AUTH',
        payload : {
            ...auth, 
            user: {...auth.user , following: [...auth.user.following, newUser]}
        }
    })

  
    try {
        const res = await patchDataApi(`user/${user._id}/friend`, null, auth.token)
        socket.emit('addfriend', res.data.newUser)
        
        const msg = {
            id: auth.user._id,
            text: 'add you as friend you',
            url: `/profile/${auth.user._id}`,
            recipients: [newUser._id],
            

        }
        dispatch(createNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}

export const unfriends = ({users, user, auth,socket}) => async (dispatch) =>{

    
    
let newUser;
if(users.every(item => item._id !== user._id)){
    newUser = {...user, friends: DeleteData(user.friends, auth.user._id)}
}else {
    users.forEach(item =>{
        if(item._id === user._id){
            newUser = {...item, friends: DeleteData(item.friends, auth.user._id)}
        }
    })
}
 
   dispatch({
        type: PROFILE_TYPES.UNFRIEND,
        payload:newUser
        
    }) 

    dispatch ({
        type:'AUTH',
        payload : {
            ...auth, 
            user: {...auth.user , following:DeleteData(auth.user.following, newUser._id)}
        }
    })
  
    try {

        const res = await patchDataApi(`user/${user._id}/unfriend`, null, auth.token)
        socket.emit('unfriend', res.data.newUser)

        const msg = {
            id: auth.user._id,
            text: 'unfriend you',
            url: `/profile/${auth.user._id}`,
            recipients: [newUser._id],
            

        }
        dispatch(removeNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}