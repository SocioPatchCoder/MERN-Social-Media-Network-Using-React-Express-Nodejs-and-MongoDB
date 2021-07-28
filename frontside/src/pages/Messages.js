import React from 'react'
import LeftSideMessage from '../components/LeftSideMessage';
import RightSideMessage from '../components/RightSideMessage';
import "../styles/Messages.css"

const Messages = ( ) =>{
    return(
        <div className="messages">
            <div className="messagesleftside">
                <LeftSideMessage/>
            </div>
            <div className="messagesrightside">
            <RightSideMessage/>
            </div>
        </div>
    )
}

export default Messages;