import React from "react"
import GlobalShortCard from "./GlobalShortCard";
import "../styles/GlobalShortCard.css"
const ShowFollowingsProfile = ({user}) => {
    console.log(user)
    return(
        <div className="showFriendsProfile">
            <div>
        <h4 style={{marginTop:'.5rem', textAlign:'center', padding:'1rem' , borderBottom:'2px solid gray' }}> Following <span style={{fontWeight:'700', color:'teal'}}> {user?.following.length} </span></h4>
        </div>
 {
     user?.following.length > 0 && user.following.slice(0,5).map(friend => (
         <GlobalShortCard friend={friend} key={friend._id}/>
     ))
 }
        </div>
    )
} 

export default ShowFollowingsProfile;