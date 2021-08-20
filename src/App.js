import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import Sidebar from './components/Sidebar';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Search from './pages/Search';

function App() {

  const [sidebarState, setSidebarState] = useState(false);

  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
  }

  return (
    <Router>
      <Switch>
        <div className = 'App'>
            <Navbar toggleSidebar = {toggleSidebar}/>
            <Sidebar toggleSidebar = {toggleSidebar} active = {sidebarState}/>
            <Route path = '/' exact component = {Home} />
            <Route path = '/home' exact component = {Home} />
            <Route path='/movie/:id' exact component = {Movie}/>
            <Route path = '/search/:searchTerm' exact component = {Search} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
