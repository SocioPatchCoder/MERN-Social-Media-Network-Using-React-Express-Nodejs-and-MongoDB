import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateProfile } from '../redux/actions/profileActions';
import "../styles/EditProfile.css";
import {checkimage} from "../utils/imageupload"



const EditProfile = ({user, SetOnEdit}) => {

    const {auth} = useSelector(state => state);
    const dispatch= useDispatch();


const initState = {website:'', fullname:'', story:'', phone:'', address:''}
    const [editData, setEditData] = useState(initState);
    const  {website, fullname, story, phone, address } = editData;
    const [avatar, setAvatar] = useState('')
    ///why you need here is i will be come back note to me.

   
    const changeavatar = (e) => {
      const file = e.target.files[0];
      const err = checkimage(file)
      if(err) return dispatch({type:"ALERT", payload:{error : err}})
      setAvatar(file)
    }
   useEffect(()=>{
       setEditData(user)
   },[user])

    const handleChangeInput = (e) =>{
        const {name, value} = e.target;
        setEditData({...editData,  [name]:value})
    }
const selectupload= () =>{
    const fileuploadinput = document.getElementById("file-upload")
    fileuploadinput.click();
}
const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(updateProfile({editData,avatar,auth}))
    SetOnEdit(false)
}
    return (
        <div className="editprofile" > 
        <div className="editprofile-content">
            <div className="editprofile-head">
                <h4 className="editprofile-headtitle">
                    Edit Your Profile
                </h4>
                <button className="editprofile-headclose" onClick={()=>SetOnEdit(false)}>
                    X
                </button>
            </div>
            <div className="editprofile-avatar">
                <img src= {avatar? URL.createObjectURL(avatar) : auth.user.avatar} alt=""/>
                <i className="fas fa-camera" onClick={selectupload}><p className="editprofile-userdatapara">Change Pic</p></i>
                <span>
                    <input style={{display:'none'}}type="file" id="file-upload" accept="image/*" onChange={changeavatar}/>
                </span>
            </div>
            <div className="editprofile-userdata">
                        <label htmlFor="fullname">FullName</label>
                        <div className="editprofile-userdatafullname">
                        <input type="text" value={fullname} onChange={handleChangeInput}
                        name="fullname" placeholder="Type your name"/>
                        <p className="editprofile-userdatapara">{fullname.length}/25</p>
                        </div>
                        <label htmlFor="address">Address</label>
                        <div className="editprofile-userdataaddress">
                        <input type="text" value={address} onChange={handleChangeInput}
                        name="address" placeholder="Type your address"/>
                        
                        </div>
                        <label htmlFor="website">Website</label>
                        <div className="editprofile-userdatawebsite">
                        <input type="text" value={website} onChange={handleChangeInput}
                        name="website" placeholder="Type your website name"/>
                      
                        </div>
                        <label htmlFor="phone">Phone</label>
                        <div className="editprofile-userdataphone">
                        <input type="text" value={phone} onChange={handleChangeInput}
                        name="phone" placeholder="Type your phone number"/>
                        
                        </div>
                        <label htmlFor="story">Story</label>
                        <div className="editprofile-userdatastory">
                        <input type="text" value={story} onChange={handleChangeInput}
                        name="story" placeholder="Type your Bio "/>
                        <p className="editprofile-userdatapara">{story.length}/200</p>
                        </div>
                        <button onClick={handleSubmit} className="editprofile-userdatabutton">Submit</button>
            </div>
            </div>
        </div>
    )
}

export default EditProfile