import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

import {AuthContext} from './AuthContext';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Search from './pages/Search';
import MyList from './pages/MyList';
import UserProfile from './pages/UserProfile'

function App() {

  const [authState, setAuthState] = useState({user: {}, loggedIn: false})
  const [sidebarState, setSidebarState] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('accessToken')){
      axios.get('http://localhost:3001/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(res => {
        if(!res.data.error){
          setAuthState({
            user: {...res.data},
            loggedIn: true
          })
        }
        else{
          localStorage.removeItem('accessToken')
        }
      })
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    window.scrollTo(0, 0)
  }

  const register = (username, password, email) => {
    axios.post('http://localhost:3001/auth', {username, email, password}).then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      setAuthState({...authState, loggedIn: true})
      window.location.reload();
    })
  }

  const login = (username, password) => {
    axios.post('http://localhost:3001/auth/login', {username, password}).then(res => {
      if(res.data.error){
        alert('Invalid credentials');
      }
      else{
        localStorage.setItem('accessToken', res.data)
        setAuthState({...authState, loggedIn: true})
        window.location.reload();
      }
    })
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({user: {}, loggedIn: false});
  }

  return (
    <AuthContext.Provider value = {{authState, setAuthState}}>
      <Router>
        <Switch>
          <div className = 'App'>
          {
            authState.loggedIn?
            <>
              <Navbar toggleSidebar = {toggleSidebar}/>
              <Sidebar logout = {logout} toggleSidebar = {toggleSidebar} active = {sidebarState}/>
              
              <Route path = '/' exact component = {Home} />
              <Route path = '/list' exact component = {MyList} />
              <Route path = '/movie/:id' exact component = {Movie}/>
              <Route path = '/profile' exact component = {() => <UserProfile uid = {authState.user.uid}/>}/>
              <Route path = '/search/:searchTerm' exact component = {Search} />
            </>
            :
            <>
              <Route path='/' component={() => <Auth login={login} register = {register} />} />
            </>
          }
            </div>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
