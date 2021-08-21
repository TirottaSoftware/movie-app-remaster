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
  }

  const register = (username, password, email) => {
    axios.post('http://localhost:3001/auth', {username, email, password}).then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
    })
  }

  const login = (username, password) => {
    axios.post('http://localhost:3001/auth/login', {username, password}).then(res => {
      localStorage.setItem('accessToken', res.data)
    })
  }

  return (
    <AuthContext.Provider value = {{authState, setAuthState}}>
      <Router>
        <Switch>
          <div className = 'App'>
              <Navbar toggleSidebar = {toggleSidebar}/>
              <Sidebar toggleSidebar = {toggleSidebar} active = {sidebarState}/>
              <Route
                path='/'
                component={() => <Auth login={login} register = {register} />}
              />
              <Route path = '/home' exact component = {Home} />
              <Route path='/movie/:id' exact component = {Movie}/>
              <Route path = '/search/:searchTerm' exact component = {Search} />
          </div>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
