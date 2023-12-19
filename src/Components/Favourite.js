import React, { Component } from 'react'
// import {movies} from './getMovies'
export default class Favourite extends Component {
    constructor(){
        super()
        this.state = {
            genreList:[],
            currGenre:'All Genres',
            movies:[],
            currText:""
        }

    }
    componentDidMount(){
        let genre={ 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' ,10759:'Action & Adventure',10762:'Kids',10763:'News',10764:'Reality',10765:'Sci-Fi & Fantasy',10766:'Soap',10767:'Talk',10768:'War & Politics'  }
        let data=JSON.parse(localStorage.getItem('movies-app')||"[]")
        let temp=[]
        data.forEach((movieObj)=>{
            if(!temp.includes(genre[movieObj.genre_ids[0]]))temp.push(genre[movieObj.genre_ids[0]])
        })
        temp.unshift("All Genres")
        this.setState({
            genreList:[...temp],
            movies:[...data]
        })
    }
    handleGenreChange=(genre)=>{
        this.setState({currGenre:genre})
    }
    handleDelete=(title)=>{
        title=title.title||title.name
        title=title.toLowerCase()
        let temp=this.state.movies.filter((item)=>{
            let itemTitle=item.title||item.name
            itemTitle.toLowerCase()
            return itemTitle!==title
        })
        this.setState({
            movies:[...temp]
        })
        localStorage.setItem('movies-app',JSON.stringify(temp))
    }
    handlePopularityDesc=()=>{
        let temp=this.state.movies
        temp.sort(function(a,b){
            return b.popularity - a.popularity
        })
        this.setState({movies:[...temp]})
    }
    handlePopularityInc=()=>{
        let temp=this.state.movies
        temp.sort(function(a,b){
            return a.popularity - b.popularity
        })
        this.setState({movies:[...temp]})
    }
    handleRatingDesc=()=>{
        let temp=this.state.movies
        temp.sort(function(a,b){
            return b.rating - a.rating
        })
        this.setState({movies:[...temp]})
    }
    handleRatingInc=()=>{
        let temp=this.state.movies
        temp.sort(function(a,b){
            return a.rating - b.rating
        })
        this.setState({movies:[...temp]})
    }
    render() {
    //   let movie=movies.results
    let genre={ 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' ,10759:'Action & Adventure',10762:'Kids',10763:'News',10764:'Reality',10765:'Sci-Fi & Fantasy',10766:'Soap',10767:'Talk',10768:'War & Politics'  }
        
    let counter = 1
    let filteredarr=[]

    
    if(this.state.currText===""){
        filteredarr=this.state.movies
    }
    else{
        
        filteredarr=this.state.movies.filter((item) =>{
            let title=item.title||item.original_title||item.original_name||item.name
            title=title.toLowerCase()
            return title.includes(this.state.currText.toLowerCase())
        })

    }
            
    if(this.state.currGenre!=='All Genres'){
        filteredarr=this.state.movies.filter((moviesObj)=>genre[moviesObj.genre_ids[0]]===this.state.currGenre)
    }
            
    

    return (
     <>
     <div className="container my-3 ">
        <div className="row">
            <div className="col-3">
                
            <ul className="list-group">
                {
                    this.state.genreList.map((item)=>(
                        this.state.currGenre===item?
                        <li className="list-group-item d-flex justify-content-between align-items-center" style={{backgroundColor:"skyblue",color:"white"}}>
                            {item}
                            <span className="badge bg-primary rounded-pill">{item.length}</span>
                        </li>:
                        <li className="list-group-item d-flex justify-content-between align-items-center"  onClick={()=>this.handleGenreChange(item)}>
                        {item}
                        <span className="badge bg-primary rounded-pill">{item.length}</span>
                        </li>
                    ))
                }
                
            </ul>
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="input-group mb-3 col search-cont">
                        <input type="text" className="form-control" placeholder="Search for the movie....." aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/ >
                        <span className="input-group-text bg-primary text-white" id="basic-addon2">Search</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <table className="table ">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><span><i className="fa-solid fa-sort-up" onClick={this.handlePopularityDesc}></i></span> Popularity <span><i className="fa-solid fa-sort-down" onClick={this.handlePopularityInc}></i></span></th>
                        <th scope="col"><i class="fa-solid fa-sort-up"></i>Rating<i class="fa-solid fa-sort-down"></i></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredarr.map((item)=>(
                                <tr>
                                    <td>{counter++}</td>
                                    <td>
                                        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="" />
                                        <span className='mx-3'>{item.title||item.name}</span>
                                    </td>
                                    <td>{genre[item.genre_ids[0]]}</td>
                                    <td>{item.popularity}</td>
                                    <td>{item.vote_count}</td>
                                    <td><button className='btn btn-outline-danger' onClick={()=>this.handleDelete(item)}><i class="fa-solid fa-trash"></i></button></td>
                                </tr>
                            ))
                        }
                    
                    </tbody>
                    </table>
                    </div>
                    <div className="row">
                    <nav aria-label="..." className='col'>
                    <ul className="pagination pagination-sm">
                        <li className="page-item active" aria-current="page">
                        <span className="page-link">1</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="/">2</a></li>
                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                    </ul>
                    </nav>
                    </div>
                </div>
            </div>
        </div>
     </div>
     </>
    )
  }
}
