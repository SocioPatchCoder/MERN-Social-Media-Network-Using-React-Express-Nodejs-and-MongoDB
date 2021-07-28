import React, { useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import {deleteComment} from "../redux/actions/commentActions"
const CommentMenuItem = ( {comment, pos, auth, setonEdit}) =>{
    const {socket} = useSelector(state => state )
    const [menuitem, setMenuitem]= useState(false)
    const dispatch = useDispatch();

    const handleRemove = () =>{
        if(pos.user._id === auth.user._id || comment.user._id === auth.user._id){
        dispatch(deleteComment({comment, pos, auth,socket}))
    }}
    const handleEditComment = () =>{
        setonEdit(true)
        setMenuitem(false)
    }

    const MenuItem = () =>{
        



        return (
            <>
            <div className="commentMenuitemlist">
                <h6 className="commentMenuitemedit" onClick={handleEditComment}  style={{cursor:'pointer'}}>Edit</h6>
                <h6 className="commentMenuitemdelete" style={{cursor:'pointer'}} onClick={handleRemove}>Remove</h6>
            </div>
            </>
        )
    }
    return (
        <div className="commentMenuItem">
            {
            (pos.user._id === auth.user._id || comment.user._id === auth.user._id) &&
            <div className="commentMenuItem" style={{cursor:"pointer"}} onClick={()=>setMenuitem(!menuitem)}> ooo </div>
            }
            {
                menuitem ? ( pos.user._id === auth.user._id ? comment.user._id === auth.user._id
                ?MenuItem()
                :<h6 className="commentMenuitemdelete"  style={{cursor:'pointer'}} onClick={handleRemove}>Remove</h6>
                :comment.user._id === auth.user._id && MenuItem()
                ) 
                :
                ""
            }
        </div>
    )
}

export default CommentMenuItem;
