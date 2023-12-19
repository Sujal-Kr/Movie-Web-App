import React, { Component } from 'react'
// import {movies} from './getMovies'
import axios from 'axios'
export default class Movies extends Component {
  constructor(){
    super()
    this.state = {
      hover:"",
      parr:[1],
      currpage:1,
      movies:[],
      favourite:[],
    }
  }
    changeMoives=async()=>{
      const res= await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=de461e7b4821428515bfd00e1ca2da02&language=en-US&page=${this.state.currpage}`)
      let data= res.data
      // set is an asyncronus function
      this.setState({
        movies:[...data.results]
      })
  }
  handleNext = (e)=>{

   let temparr=[]
   for(let i=1;i<=this.state.parr.length+1;i++){
    temparr.push(i)
   }
   this.setState({
    parr:[...temparr],
    currpage:this.state.currpage+1 
   },this.changeMoives)
  }


  handleClick = (value)=>{
    if(value!==this.state.currpage){
      this.setState({
        currpage:value
      },this.changeMoives)
    }
  }


  handlePrev = (e)=>{
    if(this.state.currpage!==1){
      this.setState({
        currpage:this.state.currpage-1
      },this.changeMoives)
    }
  }
  handleFavourite = (movie)=>{
    let oldData=JSON.parse(localStorage.getItem('movies-app')||'[]')
    if(this.state.favourite.includes(movie.id)){
      oldData= oldData.filter((m)=> m.id!=movie.id)
    }
    else{
      oldData.push(movie)
    }
    localStorage.setItem('movies-app',JSON.stringify(oldData))
    this.handleFavouriteState()
    console.log(oldData)
  }
  handleFavouriteState=(e)=>{
    let oldData=JSON.parse(localStorage.getItem('movies-app')||'[]')
    let temp= oldData.map((movie)=>movie.id)
    this.setState({
      favourite:[...temp]
    })
  }
  async componentDidMount(){
    // side effects
    const res= await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=de461e7b4821428515bfd00e1ca2da02&language=en-US&page=${this.state.currpage}`)
    let data=res.data
    console.log(data)
    this.setState({
      movies:[...data.results]
    })
  }
  render() {
        // let movie =movies.results
        console.log("render")
        console.log(this.state.currpage)
    return (
      <>  
        {
          
            this.state.movies.length ===0?
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            <div>
                <h3 className='title my-3'>Treanding</h3>
                <div className='movie-cont'>
                    {
                       this.state.movies.map(movieObj => {
                        return(
                            <div className="card movie-card">
                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={ {padding:"0.4rem",borderRadius:"12px" ,height:"100%"}}className="card-img-top image-list" alt="..."/ >
                            <div className="card-body">
                                <h5 className="card-title ">{movieObj.original_title||movieObj.name}</h5>
                                {/* <p className="card-text">{movieObj.overview}</p> */}
                                <button  className="btn btn-outline-dark ">Watch Now</button>
                                <button  className="btn btn-outline-danger mx-3 " onClick={()=>this.handleFavourite(movieObj)}><i className={this.state.favourite.includes(movieObj.id)?"fa-solid fa-heart":"fa-regular fa-heart"}></i></button>
                            </div>
                            </div>
                        )
                      })
                    }
                </div>
                
            </div>
        }
        <nav aria-label="Page navigation example " className="page-bar">
                <ul className="pagination justify-content-center" >
                  <li className="page-item ">
                    <button className="page-link"  onClick={this.handlePrev}>Previous</button>
                  </li>
                  {
                    this.state.parr.map((value)=>(
                      <li className="page-item "><a className="page-link " href="/" onClick={()=>this.handleClick(value)}>{value}</a></li>
                    ))
                  }
                  <li className="page-item">
                    <button className="page-link"  onClick={this.handleNext}>Next</button>
                  </li>
      </ul>
      </nav>
      </>
    )
  }
}
