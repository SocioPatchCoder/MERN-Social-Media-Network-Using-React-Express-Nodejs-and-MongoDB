import React from 'react';

const Toast = ({msg, handleShow, bgColor}) =>{

   
        
    
    
    return (
         <div className="toast" style={{position:'fixed',padding:'5px',borderRadius:'5px', backgroundColor:`${bgColor}` , color:'rgb(104, 104, 190)' , top:'5px', right:'5px', zIndex:'50', minWidth:'230px'}}>
            <div style={{display:'flex',alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgb(149, 149, 231)', padding:'0rem .5rem'}} className="toast-header">
                <h5 style={{fontWeight:'600'}}>{msg.title}</h5>
                <p onClick={handleShow} style={{fontSize:'1.5rem', cursor:'pointer'}}>&times;</p>
            </div>
            <div style={{padding:'0rem .5rem'}}className="toast-body">
                <p>{msg.body}</p>
            </div>
        </div>
    );
}

export default Toast;