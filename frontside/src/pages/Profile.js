
import "../styles/Profile.css"
import Info from '../components/Info';
import Posts from '../components/Posts';
import About from '../components/About';
import React , {useEffect, useState} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProfileUsers , getProfileUsersPost} from "../redux/actions/profileActions"
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Friends from "../components/Friends";
import Following from "../components/Following";
import SingleUserPosts from "../components/SingleUserPosts";
import SavedPost from "../components/SavedPost";
import { getDataApi } from "../utils/fetchDataApi";
import ProfilePhotoShow from "../components/ProfilePhotoShow";
import ProfileVideoShow from "../components/ProfileVideoShow";
import ShowFriendsProfile from "../components/ShowFriendsProfile";
import ShowFollowingsProfile from "../components/ShowFollowingsProfile";

const Profile = ( ) =>{

    const [userData, setUserData] = useState([]);
    const [UserPosts, setUserPosts] = useState([]);
    const[post,setposts] = useState([])
//check
    
const [showaccount, setshowaccount] = useState(true);
const [showfriends, setshowfriends] = useState(false);
const [showfollowing, setshowfollowing] = useState(false);
const [showsaved, setshowsaved] = useState(false);

const handletoggle = (ht) =>{
    
    if(ht === 'showaccount'){
        setshowsaved(false);
        setshowfriends(false);
        setshowfollowing(false);
        setshowaccount(true)
    }else if(ht === 'showfriends'){
        setshowsaved(false);
        setshowfriends(true);
        setshowfollowing(false);
        setshowaccount(false)
    }else  if(ht === 'showfollowing'){
        setshowsaved(false);
        setshowfriends(false);
        setshowfollowing(true);
        setshowaccount(false)
    }else  if(ht === 'showsaved'){
        setshowsaved(true);
        setshowfriends(false);
        setshowfollowing(false);
        setshowaccount(false)
    }

}
   
        
       
        
    

    // const[posts,setposts] = useState([])
    const {id} =  useParams();
    const { auth, profile } = useSelector(state => state);
    const dispatch = useDispatch();
    //At the start , redux store is undefined. it will take time 
    
    useEffect(()=>{
            
if (profile.userposts.every(item => item._id !== id))
{
    dispatch(getProfileUsersPost({ profil:profile.userposts, id, auth}))
}else{
    profile.userposts.forEach(item=>{
        if(item._id === id){
        setposts(item.posts)
        } 
    })
}
},[id, auth, profile.ids, profile.userposts, dispatch])


    useEffect(()=>{
        if( id === auth.user?._id  ) {
            setUserData([auth.user]) // it should be in array . as we declared it.
        }else{
        
            dispatch(getProfileUsers({users: profile.users, id , auth}))
            const newData = profile.users.filter(user=> user._id === id)
            setUserData(newData)   //this is already an array.
            
        }
},[id,auth,dispatch,profile.users])

// useEffect(()=>{
//     if(auth.token){
//     getDataApi('savedpost', auth.token)
//     .then(res=>console.log(res))
//     }
// },[auth.token])
// const [savedposts, setsavedposts] = useState([])
// useEffect(()=>{
//     getDataApi('savedpost', auth.token)
//     .then(res=>setsavedposts(res.data.savedposts))
    
// },[auth.token])

useEffect(()=>{
    profile.userposts.forEach(item=>{
        if(item._id === id){
        setposts(item.posts)
        } 
    })
    
},[profile.userposts, id])

const[photos, setPhotos] = useState([])

useEffect(()=>{
 const newprofileimages = post.map(item => (item.images)? item.images : '')
 setPhotos(newprofileimages)
},[post])


    return(
      
        <div className="profile">
            <Info userData={userData} post={post} dispatch={dispatch} profile={profile} auth={auth} id={id} />
          <div className ="profileheader">
              <div className="profileheader-items">
                  <IconButton className="profileheader-item" onClick={()=>handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                  </IconButton>
                  <hr/>
                  <IconButton onClick={()=>handletoggle('showfriends')}>
                        <PeopleIcon/>
                  </IconButton>
                  <hr/>
                  <IconButton onClick={()=>handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                  </IconButton>
                  <hr/>
                  <IconButton onClick={()=>handletoggle('showsaved')}>
                        <BookmarksIcon/>
                  </IconButton>
                  
              </div>
        </div>  
        { showaccount && 
         <div className = "profilebody">
             <div className="profilebody-left">
              
            <About userData={userData} dispatch={dispatch} profile={profile} auth={auth} id={id}/>
             { id === auth.user?._id &&  <>
             <ShowFriendsProfile user={auth.user}/>
             <ShowFollowingsProfile user={auth.user}/>
            </> }
            </div>

            <div className="profilebody-center">
              
            <SingleUserPosts userPosts={UserPosts} post={post} dispatch={dispatch} profile={profile} auth={auth} id={id}/>
            </div> 

            <div className="profilebody-right">
                    { photos.length > 0 &&
                    <>
                    <ProfilePhotoShow photos={photos}/>
                    <ProfileVideoShow photos={photos}/>
                    </>}
            </div> 
        </div>
}
{
    showfriends && <Friends userData={userData} dispatch={dispatch} profile={profile} auth={auth} id={id}/>
}
{
    showfollowing && <Following  userData={userData} dispatch={dispatch} profile={profile} auth={auth} id={id}/>
}
{
    showsaved && <SavedPost auth={auth}  />
}
        </div>
    )
}

export default Profile;