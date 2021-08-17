import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';

import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const api = 'https://api.themoviedb.org/3/movie/popular?api_key=a8ddc54a46d9633a6500259806fbe193';
    const topRatedApi = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a8ddc54a46d9633a6500259806fbe193';
  
    useEffect(() => {
      axios.get(api).then(res => {
        setPopular(res.data.results);
        setBannerMovie(res.data.results[1]);
      })
      axios.get(topRatedApi).then(res => {
        setTopRated(res.data.results);
      })
    }, [])
    return (
        <div>
            {bannerMovie&&<Banner movie = {bannerMovie}/>}
            {popular&&<MovieRow category = 'Popular' movies = {popular} />}
            {popular&&<MovieRow category = 'Top Rated' movies = {topRated} />}
        </div>
    )
}

export default Home
