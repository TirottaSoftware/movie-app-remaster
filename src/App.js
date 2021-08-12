import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movie from './pages/Movie';

function App() {

  return (
    <Router>
      <Switch>
        <div className = 'App'>
            <Navbar />
            <Route path = '/' exact component = {Home} />
            <Route path = '/home' exact component = {Home} />
            <Route 
              path='/movie/:id' exact component = {Movie}/>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
