import React from "react"
import {useSelector} from "react-redux"

const Banner = () =>{
    const {auth} = useSelector(state => state)
    return (
        <div style={{backgroundImage: `url(${auth.user.avatar})`, height:'250px', backgroundSize:'cover', backgroundRepeat:'no-repeat', width:'1000px', margin:'auto', borderRadius:'20px', position:'relative'}}>
            <div style={{ backgroundColor:'#fad0c4', background:"linear-gradient(315deg, rgba(150, 25, 135, 0.288), rgba(241, 167, 241, 0.288))" , height:'250px', borderRadius:'20px'}}> 
            <h3 style={{textAlign:'center', transform:'translateY(100px)'}}> Welcome To The Social Network</h3> 
            </div>
        </div>
    )
}

export default Banner;


