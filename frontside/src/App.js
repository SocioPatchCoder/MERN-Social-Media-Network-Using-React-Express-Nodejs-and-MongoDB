import "./App.css";

import "./index.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Alert from "./components/Alert";
import Header from "./components/Header";
import {useSelector, useDispatch} from 'react-redux';
import Home from "./pages/Home";
import { useEffect } from "react";
import {refreshToken} from './redux/actions/authActions'
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import PrivateRouter from "./utils/PrivateRouter";
import Profile from "./pages/Profile";
import { getPost } from "./redux/actions/postActions";
import io from "socket.io-client"
import { ALERT_TYPES } from "./redux/actions/alertActions";
import {getNotify} from "./redux/actions/notifyActions"
import SocketioClient from "./SocketioClient";
import Conversation from "./components/Conversation";

function App() {
  const {auth} = useSelector(state =>state);
  const dispatch = useDispatch();
  const login = localStorage.getItem('login');

  useEffect(()=>{
    dispatch(refreshToken())
   
    const socket = io();
    dispatch({type:ALERT_TYPES.SOCKET, payload:socket})
    return ()=>socket.close();
  },[dispatch])

useEffect(()=>{
  if(auth.token){
  dispatch(getPost(auth.token))
  dispatch(getNotify(auth))
  }
},[auth.token, auth,  dispatch])

  return (
    <div className="App">
      <Router>
        <Alert/>
        { auth.token && <Header/> }
        {auth.token && <SocketioClient/>}
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            {auth.token ? <Home /> : <Login/>}
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRouter exact path="/message">
            <Messages />
          </PrivateRouter>
          <PrivateRouter exact path="/explore">
            <Explore />
          </PrivateRouter>
          <PrivateRouter exact path="/notification">
            <Notifications />
          </PrivateRouter>
          <Route exact path="/post/:id">
          {login ? <Post/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/message/:id">
          {login ? <Conversation/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/profile/:id">
            {login ? <Profile/> : <Redirect to="/"/>}
          </Route>
          <Route> <NotFound/> </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
