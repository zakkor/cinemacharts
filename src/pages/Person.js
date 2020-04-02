import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { navigate } from '@reach/router'
import { apiURL } from '../api'

import Chart from '../components/Chart'
import Navbar from '../components/Navbar'
import ActorImage from '../components/ActorImage'

const Person = props => {
  const [actor, setActor] = useState({ name: 'Loading...' })
  const [movies, setMovies] = useState([])
  const [yearFrom, setYearFrom] = useState()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${apiURL}/person/${props.id}`)
      const data = await res.json()
      setActor(data.actor)
      setMovies(data.movies)
      setYearFrom(data.movies[0].year)
    }
    fetchData()
  }, [props.id])

  // Year filters
  const years = R.uniqBy(m => m.year, R.clone(movies)).map(m => m.year)

  if (movies.length === 0) {
    return <div>Loading...</div>
  }

  const sorted = clone(movies).sort(function (a, b) {
    if (a.rating > b.rating) {
      return 1
    }
    if (a.rating < b.rating) {
      return -1
    }
    return 0
  })

  // Actor average rating
  const sum = movies.reduce((acc, m) => { return acc + m.rating }, 0)
  const avg = Math.round(sum / movies.length * 10) / 10 // round to 2 decimal points


  // // Get URL query params
  // const yearFromParam = params.get('year_from')
  // if (yearFromParam) {
  //   yearFrom = yearFromParam
  // }
  // // Get year_to
  // let yearTo = years[years.length-1]
  // const yearToParam = params.get('year_to')
  // if (yearToParam) {
  //   yearTo = yearToParam
  // }

  const filteredMovies = movies.filter(m => {
    if (m.year < yearFrom) {
      return false
    }
    // if (m.year > yearTo) {
    //   return false
    // }

    return true
  })
  console.log('filteredMovies:', filteredMovies);
  
  // const filteredMoviesLabel = (yearFrom == years[0] && yearTo == years[years.length-1]) ? 'All films' : `Films from ${yearFrom} to ${yearTo}`

  // Top rated movies
  const topRated = sorted.slice(-10)
  // Worst rated movies
  const worstRated = sorted.slice(0, 10).reverse()

  // Decades
  const window = 10 // years
  let start = Math.floor(movies[0].year / window) * window
  let istart = 0
  let ranges = []
  for (const [i, m] of movies.entries()) {
    const floor = Math.floor(m.year / window) * window
    if (floor - start >= window || i === movies.length - 1) {
      ranges.push({
        istart: istart, iend: i,
        decade: start,
      })
      start = floor
      istart = i
    }
  }
  const decades = ranges.map(r => {
    const sel = movies.slice(r.istart, r.iend)
    const sum = sel.reduce((acc, m) => acc + m.rating, 0)
    return {
      label: r.decade + 's',
      // Average rounded to 2 decimal places
      value: Math.round(sum / sel.length * 10) / 10,
    }
  })

  console.log('yearFrom:', yearFrom);
  

  return (
    <div>
      <Navbar />
      <div className="px-10 lg:px-48 mb-48">
        <div className="flex flex-row mb-8">
          <ActorImage name={actor.name} width={140} height={209} src={actor.image_url} className="mr-6" />

          <div className="flex flex-col flex-grow mt-2">
            <div className="flex flex-row mb-4">
              <div>
                <h1 className="text-4xl font-medium tracking-wide text-gray-800"> {actor.name}</h1>
              </div>
              <div className="ml-auto">
                <h1 className="bg-gray-400 border-2 border-gray-500 px-3 pt-1 rounded-md text-4xl font-medium tracking-wide text-gray-800"> {avg} </h1>
              </div>
            </div>
            <div className="flex flex-row">
              <h2 className="text-2xl font-medium tracking-wide text-gray-600 mb-2"> Actor </h2>
              <span className="ml-auto text-2xl font-medium tracking-wide text-gray-600 mb-1"> Average rating </span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> {yearFrom} </h1>
        <Chart data={transformData(filteredMovies)}></Chart>

        <div className="flex flex-wrap mt-8">
          <SelectFilter label="From year:" options={years} urlKey="year_from" defaultValue={yearFrom} onChange={setYearFrom} />
          {/* <SelectFilter label="To year:" options={years} urlKey="year_to" value={yearTo} /> */}
        </div>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> Top films </h1>
        <Chart data={transformData(topRated)}></Chart>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> Worst films </h1>
        <Chart data={transformData(worstRated)}></Chart>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8"> By decade </h1>
        <Chart data={decades}></Chart>
      </div>
    </div>
  )
}

export default Person

const SelectFilter = props => {
  const handleChange = evt => {
    props.onChange(evt.target.value)
  }

  const optionEls = props.options.map(o => <option key={o}> {o} </option>)

  return (
    <div className="mr-8">
      <p className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"> {props.label} </p>

      <div className="inline-block relative w-64">
        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={props.defaultValue}
          onChange={handleChange}
        >
          {optionEls}
        </select>

        {/* Chevron icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
  )
}

function clone(arr) {
  return JSON.parse(JSON.stringify(arr))
}

function transformData(a) {
  return a.map(m => {
    return {
      label: m.title + ` (${m.year.toString()})`,
      value: m.rating
    }
  })
}