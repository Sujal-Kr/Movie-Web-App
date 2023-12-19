import {movies} from './getMovies'
import React, { Component } from 'react'
export default class Banner extends Component {
  render() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);   
    }
    let movie = movies.results[getRandomInt(20)]
    return (
      <div>
        <>{
            movie ===''?
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            <div className="card banner-card" >
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-image " alt="..."/>
            <div className="card-body">
              <h5 className="card-title "style={{background:"#192a56",padding:"0.5rem",display:'inline-block',color:"white",borderRadius:"4px"}}>{movie.title||movie.name}</h5>
              <p className="card-text details" style={{borderLeft:"4px solid #192a56",paddingLeft:"0.5rem"}}>{movie.overview}</p>
              <a  className="btn btn-outline-dark" href='/'>
              <i class="fa-solid fa-play"></i>
              <span> Watch Now</span>
              </a>
              <a className='btn btn-outline-danger mx-3' href='/'>
              <i class="fa-solid fa-list-check"></i>
              <span> My List</span>
              </a>
            </div>
          </div>
        }
        </>
      </div>
    )
  }
}
