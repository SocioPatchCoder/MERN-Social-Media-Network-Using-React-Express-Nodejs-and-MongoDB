import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import moment from "moment"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {useSelector, useDispatch} from "react-redux"
import CommentMenuItem from './CommentMenuItem';
import LikePost from "./LikePost";
import { updateComment , likecomment, unlikecomment } from '../redux/actions/commentActions';
import InputPostComment from "./InputPostComment"

const PostCommentCard = ({children, comment,pos,commentId}) =>{
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [readMore, setreadMore] = useState(false);
    const [onEdit, setonEdit] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [load, setLoad] = useState(false)
    const [onReply, setOnReply] = useState(false)


    const handleLike = () =>{
        if(load) return;
        setIsLike(true)
        setLoad(true)
        dispatch(likecomment({comment, pos, auth}))
        setLoad(false)
    }

    const handleUnLike = () =>{
        if(load) return;
        setIsLike(false)
        setLoad(true);
        dispatch(unlikecomment({comment, pos, auth}))
        setLoad(false)
    }
    const handleReply = () =>{
        if(onReply) return setOnReply(false);
        setOnReply({...comment, commentId})
    }

    const handleupdatecomment =() =>{
        if(comment.content === content){
            setonEdit(false)

        }else{
            dispatch(updateComment({comment,content,pos,auth}))
            setonEdit(false)
        }
    }

    useEffect(()=>{
        
        setContent(comment.content)
        if(comment.likes.find(like=>like._id === auth.user._id)){
            setIsLike(true)
        }

    },[comment.content, comment.likes, auth.user._id])

    return (
        <div className="postCommentCard">
            {comment && 
            <>
                <div className="postCommentCarduser">
                    <Link to={`profile/${comment.user?._id}`}>
                    <div className="postCommentCarduserinfo">
                        <img className="postCommentCardavatar" src={comment.user.avatar} alt={comment.user.fullname}/>
                        <div className="postCommentCardavatarinfo">
                        <h4 className="postCommentCardfullname">{comment.user.fullname}</h4>
                        <h6 className="postCommentCardtime">{moment(comment.createdAt).fromNow()}</h6>
                        </div>
                    </div>
                    </Link>
                <div className="postCommentCarduserdropdown">
                    <CommentMenuItem auth={auth} comment={comment} pos={pos} setonEdit={setonEdit}/>
                </div>
                </div>
           
            <div className="postCommentCardcommentcontent">
                <div className="postCommentCardcommentcontent-content">
                    {
                        onEdit ? 
                        <textarea  value={content} onChange={(e)=>setContent(e.target.value)}   rows="5" placeholder="change your opinion" style={{width:'100%', background:'transparent', resize:'none'}}/>
                        :
                        <>
            {
              comment?.tag && comment.tag._id !== comment.user._id && 
              <Link to ={`/profile/${comment.tag._id}`}>
                 <span style={{fontSize:'14px', marginRight:'5px' , color:'teal',fontWeight:'500'}}> @{comment.tag.username} </span>
              </Link>
          }
                         <span>
                         { content.length < 100 ?  content : readMore ? content + '..' : content.slice(0,100) + ' .. '}
                        </span>
                        <span>
                    {
                        content.length > 100 &&
                        <span style={{color:'black', cursor:'pointer'}} onClick={()=>setreadMore(!readMore)}>
                        {
                        readMore ? 'Hide ' : "Show "
                        }
                        </span>
                    }
                    </span>
                        </>

                    }
                   

                    </div>
                <div className="postCommentCardavatarcommentcontent-likes">
                <p className="postCommentCardavatarcommentcontent-likescount">{comment.likes.length}</p> <FavoriteBorderIcon style={{color:'red'}}/> 
                
                { onEdit 
                ? 
                    <>
                    <p className="postCommentCardavatarcommentcontent-reply" onClick={()=>handleupdatecomment()} style={{cursor:'pointer'}}>update</p>
                    <p className="postCommentCardavatarcommentcontent-reply" onClick={()=>setonEdit(false)}  style={{cursor:'pointer'}}>cancel</p>
                    </>
                    :
                    <p className="postCommentCardavatarcommentcontent-reply"  style={{cursor:'pointer'}}  onClick={handleReply}>{onReply ? 'replyopinion' : 'Reply' }</p>
                    } 
                 </div>
                
                 
            </div>
           
            <div className="postCommentCardLikeButton">
                <LikePost  isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike}/>
            </div>
          
            </>
}

{
    onReply && 
   
    <InputPostComment comment={comment} pos={pos} onReply={onReply} setOnReply={setOnReply}>
        <Link to={`/profile/${onReply.user._id}`}>
          @{onReply.user.username}: {' '} 
        </Link>
    </InputPostComment>
    
   
   
}

{children}

        </div>
    )
}

export default PostCommentCard;