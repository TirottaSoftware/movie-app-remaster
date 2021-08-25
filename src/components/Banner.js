import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import {useHistory} from 'react-router';

function Banner(props) {
    const [bannerTrailer, setBannerTrailer] = useState('')
    const [inList, setInList] = useState(false);
    const {authState} = useContext(AuthContext);

    const history = useHistory();
    const getMovie = (id) => {
      history.push('/movie/' + id);
      window.location.reload();
    }

    const addToList = () => {
      axios.post('http://localhost:3001/auth/movies', {
            id: props.movie.id,
            title: props.movie.title,
            poster_path: props.movie.poster_path,
            userId: authState.user.uid
        })
      .then(() => {
          setInList(true);
      })
  }

    useEffect(() => {
      props.movie&&axios.get(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`).then(res => {
        setBannerTrailer(`https://www.youtube.com/watch?v=${res.data.videos.results[0].key}`);
      })

      axios.get('http://localhost:3001/auth/movies', {
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
      })
      .then(list => {
          list.data.map(movie => {
              if(movie.movieId == props.movie.id){
                  setInList(true)
              }
          })
      })
    }, [props.movie.id])

    return (
          <div className = 'banner-container'>
            <div style = {{backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`}} className = 'hero' ></div>
              <div className = 'banner-info'>
                <h1>{props.movie.title}</h1>
                <p>{props.movie.overview}</p>
                <div className = 'banner-btn-area'>
                    <button onClick = {() => getMovie(props.movie.id)} className = 'banner-movie-btn'>i</button>
                    <a className = 'btn-banner-trailer' href = {bannerTrailer}>Trailer</a>
                    <button className = 'banner-movie-btn' onClick = {addToList}>{inList?'✓':'+'}</button>
                </div>
            </div>
          </div>
    )
}

export default Banner;