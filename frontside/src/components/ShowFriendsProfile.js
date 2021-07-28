import React from "react"
import GlobalShortCard from "./GlobalShortCard";
import "../styles/GlobalShortCard.css"
const ShowFriendsProfile = ({user}) => {
    console.log(user)
    return(
        <div className="showFriendsProfile">
            <div>
        <h4 style={{marginTop:'.5rem', textAlign:'center', padding:'1rem' , borderBottom:'2px solid gray' }}> Friends <span style={{fontWeight:'700', color:'teal'}}> {user.friends.length} </span></h4>
        </div>
 {
     user?.friends.length > 0 && user.friends.slice(0,5).map(friend => (
         <GlobalShortCard friend={friend} key={friend._id}/>
     ))
 }
        </div>
    )
} 

export default ShowFriendsProfile;