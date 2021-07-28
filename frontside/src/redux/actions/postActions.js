import {imageupload} from "../../utils/imageupload";
import {getDataApi, postDataApi , patchDataApi, deleteDataApi} from "../../utils/fetchDataApi";
import {createNotify, removeNotify} from "./notifyActions"


export const POST_TYPES= {
    CREATE_POST : "CREATE_POST",
    GET_POSTS :"GET_POSTS",
    UPDATE_POST : "UPDATE_POST",
    LOADING_POSTS :"LOADING_POSTS",
    GET_POST:"GET_POST",
    DELETE_POST:"DELETE_POST"
}


export const createpost = ({content, images, auth, socket}) => async(dispatch) => {
    
    
    let media= [];

    try {

        dispatch({type:'ALERT', payload:{loading: true}})
        
        if(images.length > 0) media = await imageupload(images);
       
        const res = await postDataApi('posts', {content, images: media}, auth.token)
        dispatch({type: POST_TYPES.CREATE_POST, payload: {...res.data.newPost, user: auth.user}})
        dispatch({type:'ALERT', payload:{loading: false}})
        
       
        //notify
        const msg = {
            id: res.data.newPost._id,
            text:'added a new Post',
            url: `/post/${res.data.newPost._id}`,
            recipients: res.data.newPost.user.friends,
            content,
            image:media[0].secure_url,

        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: "Do not"
            }
        })
        
    }
}

export const getPost = (token) => async (dispatch) =>{
    try {
       dispatch({type: POST_TYPES.LOADING_POSTS, payload: true})
        const res = await getDataApi('posts',token)
       dispatch({type:POST_TYPES.GET_POSTS , payload: res.data}) 
       dispatch({type: POST_TYPES.LOADING_POSTS, payload:false})

    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
                error: err.response.data.msg
            }
        })
    }
}

export const updatepost = ({content, images, auth, status}) => async(dispatch) => {
    
    
    let media= [];
    const newimgUrl = images.filter( img => !img.secure_url)
    const oldimgUrl = images.filter( img => img.secure_url)
    console.log({oldimgUrl, newimgUrl})
    if(status.content === content && 
        newimgUrl.length === 0 && 
        oldimgUrl.length === status.images.length)
        return;
     try {

        dispatch({type:'ALERT', payload:{loading: true}})
        
        if (newimgUrl.length > 0) media = await imageupload(newimgUrl);
       
        const res = await patchDataApi(`post/${status._id}`,
        {content, 
        images: [...oldimgUrl, ...media]}, auth.token)

   

        dispatch({type:'ALERT', payload:{success: res.data.msg}})

        dispatch({type: POST_TYPES.UPDATE_POST, payload: res.data.newPost})
        dispatch({type:'ALERT', payload:{loading: false}})
        

        

     } 
     catch (err) {
        dispatch({
            type:'ALERT',
           payload: {
            error: "nothin"
           }
   })
        
 }
}

export const likepost = ({pos, auth,socket}) => async (dispatch) =>{
    
    const newPost = {...pos, likes:[...pos.likes, auth.user]}
   
    dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('likePost', newPost )
    try {
        const res = await patchDataApi(`post/${pos._id}/like`,null, auth.token)


        const msg = {
            id: auth.user._id,
            text:'like the Post',
            url: `/post/${pos._id}`,
            recipients: [pos.user._id],
            content: pos.content,
            image:pos.images[0].secure_url,

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

export const unlikepost = ({pos, auth , socket}) => async (dispatch) =>{
    const newPost = {...pos, likes: pos.likes.filter(like => like._id !== auth.user._id)}
  
 dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})
 socket.emit('unlikePost', newPost )
     try {
         const res = await patchDataApi(`post/${pos._id}/unlike`,null, auth.token)
         
         const msg = {
            id: auth.user._id,
            text:'unlike the  Post',
            url: `/post/${pos._id}`,
            recipients: [pos.user._id],
          

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

export  const getPostsingle = ({detailPost, auth, id}) => async (dispatch) =>{
   
 if(detailPost.every(item => item._id !== id)){
     try {
         const res= await getDataApi(`post/${id}`,auth.token)
         console.log(res)
         dispatch({type: POST_TYPES.GET_POST, payload:res.data.post})
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

export const savedPost = ({pos,auth}) => async (dispatch) => {
   
    const newUser={...auth.user, saved:[...auth.user.saved, pos._id]}
 
    dispatch({type:'AUTH', payload:{...auth, user: newUser}})
    try {
        const res= await patchDataApi(`save/${pos._id}`,null, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
             error: err.response.data.msg
            }
    })
    }
}
export const unsavedPost = ({pos,auth}) => async (dispatch) => {
   
    const newUser={...auth.user, saved:auth.user.saved.filter(id=> id !== pos._id)}
 console.log(newUser)
     dispatch({type:'AUTH', payload:{...auth, user: newUser}})
    try {
        const res= await patchDataApi(`unsave/${pos._id}`,null, auth.token)
        console.log(res)
    } catch (err) {
        dispatch({
            type:'ALERT',
            payload:{
             error: err.response.data.msg
            }
    })
    }
}

export const deletePost = ({pos, auth,socket}) => async (dispatch) =>{
    
    dispatch({type:POST_TYPES.DELETE_POST, payload: pos})
    try {

        const res = await deleteDataApi(`post/${pos._id}`, auth.token)
         //notify
         const msg = {
            id: pos._id,
            text:'added a new Post',
            recipients: res.data.newPost.user.friends,
            url: `/post/${pos._id}`,
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
