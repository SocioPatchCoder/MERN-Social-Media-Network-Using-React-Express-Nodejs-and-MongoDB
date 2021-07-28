import React, { useEffect, useState } from 'react'
import PostCommentCard from './PostCommentCard'

const PostCommentDisplay = ({comment, pos , newReplay}) =>{
    const [showRep, setshowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(()=>{
            setshowRep(newReplay.slice(newReplay.length - next))
    },[newReplay, next])

    return (
        <div>
            <PostCommentCard comment={comment} pos={pos} commentId={comment._id}>
                <div>
{
     showRep.map((item,index)=>(
        item.reply &&
        <PostCommentCard 
        key={index}
        comment={item}
        commentId={comment._id}
        pos={pos}
        />

    ))
}
{
                newReplay.length - next > 0 
                ? <div  style={{textAlign:'center', padding:'5px 0', fontSize:'10px',backgroundColor:'transparent',color:'rgb(26, 21, 54)', cursor:'pointer', fontWeight:'500',borderRadius:'10px', border:'2px solid whitesmoke'  }}
                onClick={()=>setNext(prev => prev + 10)} >
                 Show More Comment +  
                </div>
                : newReplay.length > 1 &&
                <div style={{textAlign:'center',padding:'5px 0',fontSize:'10px', backgroundColor:'transparent',color:'rgb(26, 21, 54)', cursor:'pointer', fontWeight:'500',borderRadius:'10px', border:'2px solid whitesmoke' }}
                onClick={()=>setNext(1)}> 
                    Hide Extra Comments -
                </div>
            }
</div>
            </PostCommentCard>
        </div>
    )
}

export default PostCommentDisplay;