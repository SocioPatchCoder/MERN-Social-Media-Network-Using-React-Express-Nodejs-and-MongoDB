import React from 'react' ;
import  GlobalCard  from './GlobalCard';


const FriendsCard = ({user}) =>{
    
    return (
       
        <>
        <div style={{width:'1100px', maxWidth:'100%',minHeight:'20px',padding:"1rem",margin:'1rem auto',background:'white'}}>
            <h4 style={{textAlign:'center' }}>
            {user.length} <span> Friends </span> 
            </h4>
        </div>
        <div style={{width:'1100px', maxWidth:'100%', margin:'1rem auto',display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}>
            
            {user.length > 0 && user.map(fr => (
               
            <GlobalCard user={fr} key={fr._id} />
             
            ))}
        </div>
        </>
    )
}

export default FriendsCard