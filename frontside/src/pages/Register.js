import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom"
import {useSelector , useDispatch} from 'react-redux';
import {register} from '../redux/actions/authActions'

import "../styles/Register.css";

const Register = () => {
  const initialState = {username:'',fullname:'',email:'',password:'',confirmPassword:'',gender:'male'}
  
  const [showpass , setShowpass] =useState(false)
  const [showcfpass , setShowcfpass] =useState(false)
  const [userData , setuserData] = useState(initialState)
  const {username,fullname,email,password,confirmPassword,gender} = userData;

  const {auth,alert} = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange= (e) =>{
    const {name,value}= e.target;
    setuserData({...userData, [name]:value})

  }

  useEffect(()=>{
    if(auth.token){
      history.push('/')
    }
  },[auth.token,history])

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    dispatch(register(userData))
   

  }
  return (
    <div className="register">
    <div className="register-container">
    <h3 className="register-header">Social Network</h3>
    <h6 className="register-subheader">register</h6>
    
      <form className="register-dataform" onSubmit={handleSubmit}>
      <input 
      className="register-dataformemail"
      type="text" 
      value={fullname}
      name="fullname"
      onChange={handleChange}
      placeholder={alert.fullname ? `${alert.fullname}` : 'Enter your fullname'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      ></input>
     
      <input 
      className="register-dataformpass"
      type="text" 
      name="username"
      placeholder={alert.username ? `${alert.username}` : 'Enter your username'}
      value={username.toLowerCase().replace(/ /g,'')}
      onChange={handleChange}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      >
      </input>
     
      <input 
      className="register-dataformpass"
      type="email" 
      placeholder={alert.email ? `${alert.email}` : 'Enter your Email'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      value={email}
      name="email"
      onChange={handleChange}
      >
      </input>
     
      <input 
      className="register-dataformpass"
      type={showpass ? "type" : "password"} 
      placeholder={alert.password ? `${alert.password}` : 'Enter your Password'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      value={password}
      name="password"
      onChange={handleChange}
      >
      </input>
      
      <small className="register-showpass" onClick={()=>setShowpass(!showpass)}> {showpass ? "Hide" : "show"} </small>
      <input 
      className="register-dataformpass"
      type={showcfpass ? "type" : "password"} 
      placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Enter your password again'}
      style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
      value={confirmPassword}
      name="confirmPassword"
      onChange={handleChange}
      >
      </input>
     
      <select className="register-dataformselect" name="gender" value={gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <small className="register-showcfpass" onClick={()=>setShowcfpass(!showcfpass)}> {showcfpass ? "Hide" : "show"} </small>
      <button 
      className="register-dataformbtn"
      type="submit" > Log In </button> 
      <p className="register-small">Already have an account <Link to="/">LogIn HERE</Link></p>
      </form>     
      </div>
  </div>
  );
};

export default Register;
