import React, { useEffect, useState } from 'react'

import {useSelector, useDispatch} from "react-redux"
import {getDataApi} from "../utils/fetchDataApi"
import UserCardMessages from './UserCardMessages';
import {AddUser, getConversations } from "../redux/actions/messageActions"
import {useHistory} from "react-router-dom"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const LeftSideMessage = () => {
    const [search , setSearch] = useState('')
    const [searchUser, setSearchUser] = useState([])
    const [load, setLoad] = useState(false)
    const {auth, message} = useSelector(state => state)
    const history = useHistory()

    const dispatch = useDispatch();

   


     useEffect(()=>{
         if(message.firstLoad) return;
         dispatch(getConversations(auth))
     },[dispatch, auth, message.firstLoad])

    const handleSearch = async (e) =>{
        e.preventDefault();
        if(!search) return;
  
        try {
           setLoad(true)
           const res = await getDataApi(`search?username=${search}`,auth.token);
           setSearchUser(res.data.users)
           setLoad(false)
        } catch (err) {
           dispatch({
              type:'ALERT',
              payload:{
                 error: err.response.data.msg
              }
           })
        }
        
     }

     const handleAddChat = (user) => {
        setSearch('')
        setSearchUser([])
        dispatch(AddUser({user, message}))
        history.push(`/message/${user._id}`)
     }

    return (
        <div className="leftsidecontent">
            <div className="leftsidecontentsearch">
                <input className="leftsidecontentsearchinput" type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
                    placeholder="find the user for chat"
                />
                <button className="leftsidecontentsearchbutton" onClick={handleSearch}> Search </button>
            </div>
           
            <div className="leftsidecontentuserlist">
               {
                   searchUser.length !== 0 
                   ? <>
                   {
                   searchUser.map((user,index) => (
                      <div  onClick={()=>handleAddChat(user)} key={index} >
                       <UserCardMessages  user={user} />
                       </div>
                   ))
}
                   </>
                   :
                   <>
                                {
                   message.users?.length> 0 && message.users?.map((user,index) => (
                      <div  onClick={()=>handleAddChat(user)} key={index} >
                       <UserCardMessages  user={user} msg={true}>
                            <FiberManualRecordIcon/>
                           </UserCardMessages>
                       </div>
                   ))
}
                   </>
               }
            </div>
        </div>
    )
}


export default LeftSideMessage;