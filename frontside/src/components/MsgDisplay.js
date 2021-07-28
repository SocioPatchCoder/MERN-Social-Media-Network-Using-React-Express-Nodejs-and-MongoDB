import React from 'react';

const imageshow = (src) => {
    return(
        <>
        <img src={src} alt="" className="statusmsg-middleimages"/>
       
    
    </>
    )
}
const videoshow = (src) => {
    return(
        <>
        <video controls src={src} alt="" className="statusmsg-middleimages"/>
     
    
    </>
    )
}

const MsgDisplay =({user,msg}) => {
    return (
        <div className="msgdisplay">
            <div className="msgdisplayinfouser">
                <img className="msgdisplayinfouseravatar" src={user?.avatar} alt={user?.fullname}/>
                <img className="msgdisplayinfouseravatartwo" src={user?.avatar} alt={user?.fullname}/>
                <span className="msgdisplayinfouserusername"> {user?.username}</span>
            </div>
            <div className="msgdisplaytext">
               { msg.text &&  
                <p className="msgdisplayinfocontent">{msg.text}</p>
}
{
    msg.media.map((item,index)=> (
        <div key={index}>
            {
                    item.secure_url.match(/video/i)
                    ?videoshow( item.secure_url)
                    :imageshow( item.secure_url)
            }
            </div>
    ))
}
            </div>
            <div className="msgdisplaytime">
                { msg.createdAt && 
                <small className="msgdisplayinfousertime">{msg.createdAt}</small>
}
            </div>
        </div>
    )
}


export default MsgDisplay;