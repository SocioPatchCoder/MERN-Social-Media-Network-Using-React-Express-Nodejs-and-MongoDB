import React from 'react'
import LeftSideMessage from './LeftSideMessage';
import RightSideMessage from './RightSideMessage';
import "../styles/Messages.css"

const Conversation = ( ) =>{
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

export default Conversation;