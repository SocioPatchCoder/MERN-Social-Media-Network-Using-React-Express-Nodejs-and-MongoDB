import { Avatar } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import ImageIcon from '@material-ui/icons/Image';

const UserCardMessages = ({children, user,handleClose,msg}) =>{

    const handleCloseAll =() =>{

        if(handleClose) handleClose();
    }
    return (

        <div>
            <div style={{display:'flex', justifyContent:'space-between',   padding:'10px', cursor:'pointer', alignItems:'center', borderBottom:'1px solid rgb(149, 149, 231)'}}>
            <div onClick={handleCloseAll} style={{display:'flex', padding:'10px', alignItems:'center'}} >
            <Avatar src={user?.avatar}/>
            <div style={{marginLeft:'6px', color:'white'}}>
                <span style={{display:'block'}}>{user?.username}</span>
                <small>{
                    msg
                    ? <>
                    <div>{user.text}</div>
                    {
                        user.media?.length > 0 && 
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            {user.media?.length} <ImageIcon/>
                        </div>
                    }
                    </>
                    : user.fullname
                    }
                    </small>
            </div>
            </div>
            {children}
            </div>
            
        </div>
    )
}

export default UserCardMessages;