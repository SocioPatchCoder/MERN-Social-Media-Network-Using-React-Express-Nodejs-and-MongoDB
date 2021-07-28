import React, { useState } from 'react';
import "../styles/PostCard.css"

const PostCardBody = ({pos}) =>{
    const [readMore ,setreadMore] = useState(false)
    const [currentImage, setCurrentImage] = useState(0);
    
    const shownextimage = (nextimage) =>{
        
        if(currentImage < nextimage.length - 1 ){
            setCurrentImage(prev => prev + 1)
        }
    }
    const showprevimage = (previmage) => {

        
        if( currentImage > 0 && currentImage <= previmage.length - 1   ){
            setCurrentImage (prev => prev - 1)
        }
    }
    


    return (
        <div className="postcardbody" style={{ margin:'1rem 0',padding:'1rem 0'}}>
            <div className="postcardbodycontent">
                {pos && pos.content?.length < 60 ?
                pos.content :
                readMore ? pos.content + '...' : pos.content?.slice(0,60) + '..... '}
                <span>
                    {
                        pos.content?.length > 60 &&
                        <span style={{color:'black', cursor:'pointer'}} onClick={()=>setreadMore(!readMore)}>
                        {
                        readMore ? 'Hide ' : "Show "
                        }
                        </span>
                    }
                </span>
            </div>
            <div className="postcardbodyimage">
               
               <span className="postcardbodyimagenext" onClick={()=>shownextimage(pos.images)} > v </span>
               <span className="postcardbodyimageprev" onClick={()=>showprevimage(pos.images)}> v </span>
              
                {pos.images?.length> 0 && pos.images?.map((image,index)=>(
                     (index === currentImage) &&
                <div className="postcardbodyimages" key={index}>
                  
                    {
                     image.secure_url.match(/video/i) 
                     ?<video  controls src={image.secure_url} alt={pos.user?.fullname} height="100%" width="100%"/> :
                      <img src={image.secure_url} alt={pos.user?.fullname}/>
                 
                    }
                  
                </div>
                ))}
                
            </div>
        </div>
    )
}

export default PostCardBody;