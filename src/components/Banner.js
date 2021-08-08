import React from 'react'

function Banner(props) {
    console.log(props.movie)
    return (
          <div className = 'banner-container'>
            <div style = {{backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`}} className = 'hero' ></div>
            <h1>{props.movie.title}</h1>
            <p>{props.movie.overview}</p>
            <div className = 'banner-btn-area'>
                <button className = 'banner-movie-btn'>i</button>
                <button className = 'btn-banner-trailer'>Trailer</button>
                <button className = 'banner-movie-btn'>+</button>
            </div>
          </div>
    )
}

export default Banner;