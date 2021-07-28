import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from "react-redux"
import "../styles/Status.css"
import PhotoIcon from '@material-ui/icons/Photo';
import CameraIcon from '@material-ui/icons/Camera';
import {useDispatch} from "react-redux";
import {createpost , updatepost} from "../redux/actions/postActions"
import {ALERT_TYPES} from "../redux/actions/alertActions"

const Status = () =>{
    const {auth,status,socket} = useSelector(state => state)
    const [content, setContent] = useState('')
    const dispatch = useDispatch();
    const [images, setImages] = useState([])
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState('')
    const refVideo = useRef();
    const refCanvas = useRef();

    useEffect(()=>{
            if(status.edit){
                setContent(status.content)
                setImages(status.images)
               
            }
    },[status])

    const uploadimages = (e) =>{
        const files = [...e.target.files];
        let err='';
        let imagesArr = [];

        files.forEach(file=> {
            if(!file) return err="no file found";
            if(file.size > 1024 *1024 * 5) return err="file is too long";

            return imagesArr.push(file);       
    } 
)
if(err) { dispatch({type:"ALERT", payload:{error: err}}) }
        setImages([...images, ...imagesArr])
        

    }

    const deleteimage= (inde)=>{
        const newArrimage= [...images]
        newArrimage.splice(inde, 1)
        setImages(newArrimage)
    }
    const handleuploadinput = () =>{
            const imageuploadfunc = document.getElementById("postupload");
            imageuploadfunc.click();


    }
    

    const handleStream = () =>{
        setStream(true)
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video:true})
            .then((stream =>{
                refVideo.current.srcObject = stream;
                refVideo.current.play();
                const track = stream.getTracks();
                
                setTracks(track[0])

                
                
            })).catch(err => console.log(err))
        }
    }
    const handlecameraimage = () =>{
        const width = refVideo.current.clientWidth;
        const height = refVideo.current.clientWidth;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);
        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(refVideo.current, 0, 0, width, height)
        const URL = refCanvas.current.toDataURL();
        setImages([...images, {camera:URL}])
        console.log(images)


    }

    const handleStreamStop = () =>{
        tracks.stop();
        setStream(false)
    }
    const handleSubmit = (e) =>{
    e.preventDefault();
   
    if(images.length === 0) 
     return dispatch({
        type:'ALERT',
        payload: {error : "add your image"} 
    })

    if(status.edit){
        dispatch(updatepost({content, images, auth, status,socket}))
        dispatch({type: ALERT_TYPES.STATUS , payload: {edit : false}})
    } else {
        dispatch(createpost({content, images, auth, socket}))
        setContent('')
        setImages([])
        if(tracks) tracks.stop()
    }
    setContent('')
    setImages([])
    if(tracks) tracks.stop()

    }
    const handleDiscard = (e) =>{
        e.preventDefault();
        setContent('')
        setImages([])
        if(tracks) tracks.stop()
        dispatch({type: ALERT_TYPES.STATUS , payload: {edit : false}})
    }
    const imageshow = (src) => {
        return(
            <>
            <img src={src} alt="" className="status-middleimages"/>
           
        
        </>
        )
    }
    const videoshow = (src) => {
        return(
            <>
            <video controls src={src} alt="" className="status-middleimages"/>
         
        
        </>
        )
    }
    return (
        <div className  =  {status.edit ? "editstatus" : "status"}   >
            <form onSubmit={handleSubmit}>
                <div className="status-header">
                    <img src={auth?.user.avatar} alt=""/>
                    <h4>Status</h4>
                </div>
                <div className="status-middle">
                    <textarea type="text" placeholder="Share your thoughts" 
                    value={content} onChange={(e)=>setContent(e.target.value)}
                     rows="5" col="1000"/>
                    <small>{content.length}</small>
                </div>
               <div className="status-imagesdiv">
                {
                    images && images.map((image,index)=> (
                        
                      <div className="status-middleimagecontainer" >
                         {
                           image.camera ? imageshow(image.camera)
                           :image.secure_url?
                           <>{
                               image.secure_url.match(/video/i) 
                               ? videoshow(image.secure_url)
                               : imageshow(image.secure_url)
                           }
                           </>
                           :
                           <>
                           {
                           image.type.match(/video/i)
                           ? videoshow(URL.createObjectURL(image))
                           : imageshow(URL.createObjectURL(image))
}
                           </>
                       }
                           <span className="status-middleimagedelete" onClick={()=>deleteimage(index)}> x </span>
                        </div>
                    ))
                }
                </div>
                {
                    stream && <div className="status-stream">
                        <video  autoPlay muted ref={refVideo} style={{height:'250px', width:'100%', border:'2px solid gray', padding:'3px',  borderRadius:'10px'}}/>
                        <span className="status-middlestreamstop" onClick={handleStreamStop}> x </span>
                        <canvas ref={refCanvas} style={{display:'none'}}/> 
                    </div>
                }
               
                <div className="status-footer">
                    
                    <div className="status-footerright">
                    { 
                    stream 
                    ? <PhotoIcon onClick={handlecameraimage}/>
                    : 
                    <>
                    <CameraIcon onClick={handleStream}/>
                    <PhotoIcon onClick={handleuploadinput}/>
                    </>
                    }
                    <span><input  style={{display:'none'}} type="file" id="postupload" onChange={uploadimages} multiple/></span>
                    </div>
                    <div className="status-footerleft">
                        <button className="status-footerleftdiscard" onClick={handleDiscard}>Discard</button>
                        <button className="status-footerleftcreate" type="submit">Create</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Status