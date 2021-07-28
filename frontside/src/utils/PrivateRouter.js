import React from 'react'
import {Route, Redirect} from "react-router-dom"

const PrivateRouter = ( {props,children}) =>{
    const login = localStorage.getItem('login')
    return login ? <Route {...props}> {children} </Route> : <Redirect to="/"/>
    
}

export default PrivateRouter;