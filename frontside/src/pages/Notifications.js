import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import moment from 'moment'
import "../styles/Notification.css"
import {Link} from 'react-router-dom'
import {readnotify, deleteNotifiesAll} from "../redux/actions/notifyActions"

const Notifications = ( ) =>{
    const {notify, auth} = useSelector(state => state)
    const dispatch = useDispatch();
  
    const isReadNotify = (dt) =>{
        console.log(dt)
        dispatch(readnotify({dt, auth}))
        
    }

    const handleDeleteAll = () =>{
        const newArr = notify.data.filter(item => item.isRead === false)
        if(newArr.length === 0 ) dispatch(deleteNotifiesAll(auth))

        if(window.confirm(`you have ${newArr.length} unread notifications . are you sure you want to delete `))
        {
            dispatch(deleteNotifiesAll(auth))
        }
    }
    return(
        <div className="notifications">
            <div className="notificationheader">
                <h5 className="notificationheaderheding"> Notifications</h5>
                <h5 className="notificationheaderheding" style={{cursor:'pointer'}} onClick={handleDeleteAll}> Delete All </h5>
                <small className="notificationheadericon">  bell icon </small>
            </div>
            {
                notify.data.length > 0  && notify?.data.map((dt,index)=> (
                   
                    <div className="notificationdata" key={index}>
                        <Link to={`${dt.url}`} onClick={()=>isReadNotify(dt)}>
                      <div className="notificationdata-top">  
                        <img className="notificationdata-topavatar" src={dt?.user?.avatar} alt=""/>
                        <div className="notificationdata-topsecond">
                         <h4 className="notificationdata-topsecondhead"> {dt?.user?.fullname} {dt.text} </h4>
                         <h6 className="notificationdata-topsecondheadtwo"> {dt?.content?.slice(0,20)} </h6>
                        </div>
                        <img  className="notificationdata-topimage" src={dt?.image} alt=""/>
                        
                     </div>
                     </Link>
                     <div className="notificationdatabottom">
                    <small  className="notificationdatabottomdate">{moment(dt?.createdAt).fromNow()}</small>
                    {
                        dt.isRead ? <p> o </p> : <p style={{color:'red', fontSize:'20px'}}> o </p>
                    }
                    </div>
                     </div>
                    

                ))
            }
        </div>
    )
}

export default Notifications;