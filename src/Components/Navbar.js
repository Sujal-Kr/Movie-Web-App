import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class MovieBar extends Component {
  render() {
    return (
      <nav className="navbar  bg-info-subtle" style={{position: "sticky",top: 0,left:0,zIndex:100}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to='/' style={{fontWeight:"bold"}}>Movies Hub</Link>
        <Link className="navbar-favourite" to='/Favourite' style={{textDecoration:"none"}}>
        <i class="fa-regular fa-heart" style={{color:"red"}}></i>
        <span className='fvrt' style={{color:"black"}}> Favourites</span>
        </Link>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </nav>
    )
  }
}
