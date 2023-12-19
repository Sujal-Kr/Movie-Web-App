import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <h1 className='footer-title'>Movie Hub</h1>
        <p className='footer-content'>Home | About | Favourite | Trending</p>
        <div className="social-links-cont">
        <i class="fa-brands fa-meta"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-square-twitter"></i>
        <i class="fa-brands fa-youtube"></i>
        </div>
        <div className="copyright">Copyright <span>2002</span> Ankit Ranjan</div>
      </div>
    )
  }
}
