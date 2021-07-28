import React from "react"
import Posts from "./Posts"
import Status from "./Status";
import {useSelector} from "react-redux"

const HomeMid = () =>{
    const {homePost} = useSelector(state => state)
    return (
        <div className="homemid">
            <Status/>
        {
            homePost && homePost.loading 
            ? <p> Loading .... </p>
            : homePost.result === 0 
            ? <h4> No Post Available </h4>
            : <Posts/>
        }
        </div>
    )
}

export default HomeMid;