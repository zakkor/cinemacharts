import React, { useState, useEffect } from 'react'
import { apiURL } from '../api'
import Chart from '../components/Chart'
import Navbar from '../components/Navbar'

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

  const sorted = clone(movies).sort(function(a, b) {
    if (a.rating > b.rating) {
      return 1
    }
    if (a.rating < b.rating) {
      return -1
    }
    return 0
  })
    
  const topRated = sorted.slice(-10)
  const worstRated = sorted.slice(0, 10).reverse()
  
  // Average:
  const sum = movies.reduce((acc, m) => { return acc + m.rating }, 0)
  // 2 decimal points
  const avg = Math.round(sum / movies.length * 10) / 10

  return (
    <div>
      <Navbar />
      <div className="px-10 lg:px-48 mb-48">
        <div className="flex flex-row mb-4">
          <div>
            <h1 className="text-4xl font-medium tracking-wide text-gray-800"> {actor.name}</h1>
          </div>
            <div className="ml-auto">
              <h1 className="bg-gray-400 px-3 pt-1 rounded-md text-4xl font-medium tracking-wide text-gray-800"> {avg} </h1>
            </div>
        </div>
        <div className="flex flex-row">
          <h2 className="text-2xl font-medium tracking-wide text-gray-600 mb-2"> Actor </h2>
          <span className="ml-auto text-2xl font-medium tracking-wide text-gray-600 mb-1"> Average rating </span>
        </div>

        <hr className="mb-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> All films </h1>
        <Chart movies={movies}></Chart>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> Top films </h1>
        <Chart movies={topRated}></Chart>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> Worst films </h1>
        <Chart movies={worstRated}></Chart>
      </div>
    </div>
  )
}

export default Person