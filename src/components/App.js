import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'
import Home from './Home'
import * as Cookies from "js-cookie";

const cookieKey = "ESG_Session";
export const setSessionCookie = (session) => {
  Cookies.remove(cookieKey);
  Cookies.set(cookieKey, session, { expires: 14 });
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get(cookieKey);

  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};


export const FakeAuth = {
  isAuthenticated: false,

  authenticate(cb){
    this.isAuthenticated = true
    setSessionCookie(1);
    setTimeout(cb, 100)
  },

  signout(cb){
    this.isAuthenticated = false
    setSessionCookie(null);
    setTimeout(cb, 100)
  }
}

var sessionValue = getSessionCookie()
if ( sessionValue != null && sessionValue === 1){
  FakeAuth.isAuthenticated = true
}
else{
  FakeAuth.isAuthenticated = false
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    FakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)


export default function ESGDashboard () {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login}/>
        <PrivateRoute exact path='/' component={Dashboard} />
      </div>
    </Router>
  )
}