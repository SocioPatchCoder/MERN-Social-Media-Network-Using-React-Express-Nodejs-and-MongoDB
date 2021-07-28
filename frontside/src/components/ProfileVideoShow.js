import React from "react"
import "../styles/ProfilePhotoShow.css"


const ProfileVideoShow = ({photos}) =>{
    console.log(photos)
    return (
        <div className="profilephotoshow">
             <h4 style={{textAlign:'center', fontSize:"20px", fontWeight:'500', borderBottom:'2px solid gray'}}> Videos </h4>
         
            <div className="profilevideoshowmap">
                {
                    photos.length > 0 && photos.slice(0,3).map(item => (
                     <>   {
                            
                            item[0].secure_url.match(/video/i)
                            ? <video className="profilevideosshowimages"  controls src={item[0].secure_url} alt=""/>
                            : ''
                            
                        }
                        </>
                    ))
                }
             
            </div>
        </div>
    )
}

export default ProfileVideoShow;