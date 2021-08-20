import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router';

function Banner(props) {
    const [bannerTrailer, setBannerTrailer] = useState('')

    const history = useHistory();
    const getMovie = (id) => {
      history.push('/movie/' + id);
      window.location.reload();
    }

    useEffect(() => {
      props.movie&&axios.get(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`).then(res => {
        setBannerTrailer(`https://www.youtube.com/watch?v=${res.data.videos.results[0].key}`);
      })
    }, [props.movie.id])

    return (
          <div className = 'banner-container'>
            <div style = {{backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`}} className = 'hero' ></div>
            <h1>{props.movie.title}</h1>
            <p>{props.movie.overview}</p>
            <div className = 'banner-btn-area'>
                <button onClick = {() => getMovie(props.movie.id)} className = 'banner-movie-btn'>i</button>
                <a className = 'btn-banner-trailer' href = {bannerTrailer}>Trailer</a>
                <button className = 'banner-movie-btn'>+</button>
            </div>
          </div>
    )
}

export default Banner;