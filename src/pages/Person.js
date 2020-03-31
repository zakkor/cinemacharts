import React, { useState, useEffect } from 'react'
import { apiURL } from '../api'
import Chart from '../components/Chart'

function clone(arr) {
  return JSON.parse(JSON.stringify(arr))
}

const Person = props => {
  const [actor, setActor] = useState({ name: 'Loading...' })
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${apiURL}/person/${props.id}`)
      const data = await res.json()
      setActor(data.actor)
      setMovies(data.movies)
    }
    fetchData()
  }, [props.id])

  if (movies.length === 0) {
    return <div>Loading...</div>
  }

  // const latestMovies = movies.filter(m => m.year > 2010)

  const sorted = clone(movies).sort(function(a, b) {
    if (a.rating > b.rating) {
      return 1
    }
    if (a.rating < b.rating) {
      return -1
    }
    if (a.rating == b.rating) {
      return 0
    }
  })
    
  const topRated = sorted.slice(-10)
  const worstRated = sorted.slice(0, 10)

  return (
    <div>
      <h1>{actor.name}</h1>
      <div>
        <h2>All movies</h2>
        <Chart movies={movies}></Chart>

        <h2>Top rated</h2>
        <Chart movies={topRated}></Chart>

        <h2>Worst rated</h2>
        <Chart movies={worstRated}></Chart>
{/* 
        <h2>Last 10 years</h2>
        <Chart movies={latestMovies}></Chart> */}
      </div>
    </div>
  )
}

export default Person