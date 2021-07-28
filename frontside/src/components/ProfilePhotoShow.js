import React from "react"
import "../styles/ProfilePhotoShow.css"


const ProfilePhotoShow = ({photos}) =>{
    console.log(photos)
    return (
        <div className="profilephotoshow">
                <h4 style={{textAlign:'center', fontSize:"20px", fontWeight:'500', borderBottom:'2px solid gray'}}> Photos </h4>
              
            <div className="profilephotshowmap">
                {
                    photos.length > 0 && photos.slice(0,12).map(item => (
                     <>   {
                            
                            item[0].secure_url.match(/video/i)
                            ? ''
                            : <img className="profilephotsshowimages" src={item[0].secure_url} alt=""/>
                            
                        }
                        </>
                    ))
                }
             
            </div>
        </div>
    )
}

export default ProfilePhotoShow;