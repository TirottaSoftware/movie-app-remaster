import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import Banner from './components/Banner';

function App() {

  const [popular, setPopular] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const api = 'https://api.themoviedb.org/3/movie/popular?api_key=a8ddc54a46d9633a6500259806fbe193';

  useEffect(() => {
    axios.get(api).then(res => {
      setPopular(res.data.results);
      setBannerMovie(res.data.results[1]);
    })
  }, [])

  return (
    <div>
        <Navbar />
        {bannerMovie&&<Banner movie = {bannerMovie}/>}
    </div>
  );
}

export default App;
