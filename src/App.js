import React, { useEffect, useState } from 'react'

import searchIcon from './icons8-search.svg'
import { MovieCard } from './components/MovieCard'

const API_URL='http://www.omdbapi.com/?apikey=ed515bdd'

export default function App() {
  const [movies,setMovies]=useState([]);
  const [searchTerm,setSeachTerm]=useState('');

  const searchMovies=async (title)=> {
    const res=await fetch(`${API_URL}&s=${title}`)
    const data=await res.json();
    console.log(data);
    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies(searchTerm)
  }, [])
  

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className="search">
        <input 
        type="text"
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e)=>setSeachTerm(e.target.value)}
        />
        <img 
        src={searchIcon} 
        alt="search"
        onClick={()=>searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0 ?  (
          <div className="container">
          {movies.map((movie)=>(
            <MovieCard movie={movie}/>
          ))}
          </div>
        ):(
          <div className='empty'>
            <h2>No movie found</h2>
          </div>
        )
      }
      
    </div>
  )
}
