import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {addfriends , unfriends} from "../redux/actions/profileActions"



const GlobalFriendBtn = ({classbtn , user}) =>{

    const {auth, profile, socket} = useSelector(state => state);
    const dispatch = useDispatch();

    const [friend,setFriend] = useState(false)
    const [load, setLoad] = useState(false)
   
useEffect(()=>{
    if(auth.user.following.find(item => item._id === user._id)){
        setFriend(true)

    }
},[auth.user.following,user._id])

    const addfriend = () => {
        if(load) return;
        setFriend(true)
        setLoad(true)
        dispatch(addfriends({users:profile.users, user, auth, socket}))
        setLoad(false)
        
    }
    const removefriend = () =>{
        if(load) return;
        setFriend(false)
        setLoad(true)
        dispatch(unfriends({users:profile.users, user, auth, socket}))
        setLoad(false)
    }
    
    return (
        <>
        {
            friend ? 
              <button className={classbtn} onClick = {removefriend} style={{backgroundColor:'crimson'}}>Un Friend</button>
            : <button className={classbtn} onClick = {addfriend}>Add Friend</button>
        }
        </>
    )
}

export default GlobalFriendBtn
