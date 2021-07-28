import React, { useEffect, useState } from 'react'
import PostCommentDisplay from './PostCommentDisplay';

const PostComments = ({pos}) =>{
    const [comments, setComments] = useState([])
    const [showComments, setShowcomments] = useState([])
    const [replyComments, setReplyComments] = useState([])
    const [next, setNext] = useState(2);

    useEffect(()=>{
        const ncm = pos.commentss.filter(cm => !cm.reply ) 
        setComments(ncm);
        setShowcomments(ncm.slice(ncm.length - next))
    },[pos.commentss, next])

    useEffect(()=>{
        const newRpl = pos.commentss.filter(cm => cm.reply ) 
        setReplyComments(newRpl);
       
    },[pos.commentss])
  
    return (
        <div>
            {
              showComments && showComments.map(comment=>(
                  <PostCommentDisplay comment={comment} pos={pos} key={comment._id}
                  newReplay={replyComments.filter(item => item.reply === comment._id)}/>
              ))  
            }
            {
                comments.length - next > 0 
                ? <div  style={{textAlign:'center', padding:'5px 0', fontSize:'10px',backgroundColor:'transparent',color:'rgb(26, 21, 54)', cursor:'pointer', fontWeight:'500',borderRadius:'10px', border:'2px solid whitesmoke'  }}
                onClick={()=>setNext(prev => prev + 10)} >
                 Show More Comment +  
                </div>
                : comments.length > 2 &&
                <div style={{textAlign:'center',padding:'5px 0',fontSize:'10px', backgroundColor:'transparent',color:'rgb(26, 21, 54)', cursor:'pointer', fontWeight:'500',borderRadius:'10px', border:'2px solid whitesmoke' }}
                onClick={()=>setNext(2)}> 
                    Hide Extra Comments -
                </div>
            }
        </div>
    )
}

export default PostComments;