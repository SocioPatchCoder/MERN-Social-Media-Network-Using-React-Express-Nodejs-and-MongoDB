import React from "react"
import "../styles/GlobalShortCard.css"
;const GlobalShortCard = ({friend}) => {
    console.log(friend)
    return(
        <div className="globalshortcard">
           <img className="globalshortcardcontentavatar" src={friend.avatar} alt=""/>
                <div className="globalshortcardcontentinfo">
                    <h4 className="globalshortcardcontentinfofullname">{friend.fullname}</h4>
                    <h6 className="globalshortcardcontentinfousername">{friend.username}</h6>
        </div>
        </div>
    )
} 

export default GlobalShortCard;