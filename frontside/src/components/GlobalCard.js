import React, { useState } from 'react';
import "../styles/GlobalCard.css"
import PersonIcon from '@material-ui/icons/Person';
import {useSelector} from "react-redux"
import GlobalFriendBtn from './GlobalFriendBtn';

import {Link} from "react-router-dom"

const GlobalCard = ({user} ) =>{
   const [showinfo, setshowinfo] = useState(true);
   const [showinfoabout,setshowinfoabout] = useState(false)
const {auth} = useSelector(state => state)
 

   const toggleshowinfo = (sinfo) => {
        if(sinfo === 'showinfo'){
            setshowinfo(true);
            setshowinfoabout(false);
        }else if (sinfo === 'showinfoabout'){
            setshowinfo(false);
            setshowinfoabout(true)
        }
   }
    

    return (
        <div className="globalcard">
            <div className="globalcard-content">
                <div className="globalcard-contenttop">
                    <img src={user.avatar} alt=""/>
                </div>
                <div className="globalcard-contentmiddle">
                    <img src={user.avatar} alt=""/>

                </div>
                <Link to={`/profile/${user._id}`}>
                <div className="globalcard-contentmiddleinfo">
                    <h4>{user.fullname}</h4>
                    <h6>{user.username}</h6>
                </div>
                </Link>
               { showinfo &&
               <>
                <div className="globalcard-contentbottom">
           
                    <div className="globalcard-contentbottomstat">
                        <h6>{user.friends.length}</h6>
                        <p>Friends</p>
                    </div>
                    <div className="globalcard-contentbottomstat">
                        <h6>{user.following.length}</h6>
                        <p>Following</p>
                    </div>
                    <div className="globalcard-contentbottomstat">
                        <h6>0</h6>
                        <p>Posts</p>
                    </div>
                    </div>
                    <div className ="globalcard-contentbottomgender">
                        <PersonIcon style={{color: user.gender === 'male' ? 'rgb(57, 47, 146)' :'rgb(228, 120, 138)'}}/>
                    </div>
                    {
                        auth.user._id !== user._id && <GlobalFriendBtn classbtn="globalcard-contentbottombtn" user={user}/>
                    }
                </>
}
{
    showinfoabout && 
    <div className = "globalcard-contentbottomabout"> 
      <p className="globalcard-contentbottomabout-story">
        {user.story}
        </p>
      <h4 className="globalcard-contentbottomabout-email">
          {user.email}
      </h4>
      <h5 className="globalcard-contentbottomabout-website">
          {user.website}
      </h5>
     
    </div>
}
                <div className="globalcard-contentbottomnavigate"> 
                <span onClick={()=>toggleshowinfo('showinfo')}> o </span> <span onClick={()=>toggleshowinfo('showinfoabout')} > o </span>
                </div>
            </div>
            
        </div>
    )
}

export default GlobalCard;