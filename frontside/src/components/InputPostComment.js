
import React, { useState } from 'react'
import '../styles/CommentStyle.css';
import {useSelector, useDispatch} from 'react-redux'
import { createComment } from '../redux/actions/commentActions';


const InputPostComment = ({children, pos, comment, onReply, setOnReply}) =>{
    const{auth,socket} = useSelector(state =>state);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(onReply)  return setOnReply(false);
            return;
        }
        const newComment = {
            content,
            likes:[],
            user:auth.user,
            createdAt: new Date().toISOString(),
            reply:onReply && onReply.commentId,
            tag : onReply && onReply.user
        }
       

     dispatch(createComment({pos, newComment, auth, socket}))
        if(onReply) return setOnReply(false)
        SetContent('')
    }
const [content, SetContent] = useState('')
    return (
        <div className="inputpostcomments">
            
            <div className="inputpostcomments-left">
                <img src={auth.user.avatar} alt=""/>
              
            </div>
           {children}
            <input className="inputpostcomments-input" type="text" placeholder="input your opinion" value={content}
            onChange={(e)=>{SetContent(e.target.value)}}/>
         
            
            <button className="inputpostcomments-button" onClick={handleSubmit}> Say it </button>
        </div>
    )
}

export default InputPostComment;