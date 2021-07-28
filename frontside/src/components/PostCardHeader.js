import React, { useState } from 'react';
import {Link , useHistory} from "react-router-dom"
import "../styles/PostCard.css"
import moment from 'moment'
import {useDispatch, useSelector} from"react-redux"
import {ALERT_TYPES} from "../redux/actions/alertActions"
import { deletePost } from '../redux/actions/postActions';
import {BASE_URL} from "../utils/config"

const PostCardHeader = ({pos}) =>{
    const {auth, socket} = useSelector(state => state)
    const [showdrop,setshowdrop] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();

    const handleEdit = (ed) =>{
        
        dispatch({type: ALERT_TYPES.STATUS , payload:{...pos, edit:true}})
        setshowdrop(false)
    }
    
    const handleDeletePost = () =>{
        dispatch(deletePost({pos, auth,socket}))
        setshowdrop(false)
        history.push('/')

    }

    const handleCopyPostLink = () =>{
        navigator.clipboard.writeText(`${BASE_URL}/post/${pos._id}`)
        setshowdrop(false)
    }
    return (
        <div className="postcardheader">
            <Link to={`/profile/${pos.user._id}`}>
            <div className="postcardheadertop">
                <img className="postcardheadertopavatar"src={pos.user?.avatar} alt={pos.user.fullname}/>
            
            <div className="postcardheaderinfo">
                <h6>{pos.user?.fullname} <span style={{color:'gray', fontSize:'14px',fontWeight:'600'}}> posted </span>{pos.images?.length} {pos.images?.length > 1 ? " images" : "image"} </h6>
                <h4> {moment(pos.createdAt).fromNow()}</h4>
            </div>
            </div>
            </Link>
            <div className="postcardheaderdown">
                <p onClick={()=>setshowdrop(!showdrop)}>ooo</p>
                
            {
                    showdrop &&
            <div className="postcarddropdown">
                    {auth?.user._id === pos.user._id ? 
                    <>
                    <h6 onClick={()=>handleEdit(pos)}>Update Post</h6>
                    <h6 onClick={handleDeletePost}>Delete Post</h6>
                    <h6 onClick={handleCopyPostLink}>Copy Link</h6>
                    </>
                    :
                    <h6>Copy Link</h6>
                    }

                </div>
}
            </div>
        </div>
    )
}

export default PostCardHeader;