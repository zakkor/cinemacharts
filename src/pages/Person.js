import React, { useState, useEffect, useMemo } from 'react'
import * as R from 'ramda'
import { apiURL } from '../api'

import Chart from '../components/Chart'
import Navbar from '../components/Navbar'
import PersonImage from '../components/PersonImage'

const Person = props => {
  const [person, setPerson] = useState({ actor: {}, movies: [] })
  const [filters, setFilters] = useState({
    yearFrom: -1,
    yearTo: -1,
  })
  const { actor, movies } = person

  const { filteredMovies, years } = useMemo(() => {
    const years = R.uniqBy(m => m.year, R.clone(movies)).map(m => m.year)
    return {
      filteredMovies: toChartData(movies.filter(m => {
        if (filters.yearFrom !== -1 && m.year < filters.yearFrom) {
          return false
        }
        if (filters.yearTo !== -1 && m.year > filters.yearTo) {
          return false
        }
        return true
      })),
      years,
    }
  }, [movies, filters])

  if (years.length > 0 && (filters.yearFrom === -1 || filters.yearTo === -1)) {
    setFilters({ yearFrom: years[0], yearTo: years[years.length-1] })
  }

  const { top, worst, decades } = useMemo(() => {
    const sorted = R.sortBy(m => m.rating, R.clone(movies))
    return {
      top: toChartData(R.takeLast(10, sorted)),
      worst: toChartData(R.take(10, sorted)),
      decades: averageEachDecade(movies),
    }
  }, [movies])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${apiURL}/person/${props.id}`)
      const data = await res.json()
      setPerson(data)
    }
    fetchData()
  }, [props.id])

  if (!person) {
    return <div> Loading... </div>
  }

  // Actor average rating
  const sum = movies.reduce((acc, m) => { return acc + m.rating }, 0)
  const average = Math.round(sum / movies.length * 10) / 10 // round to 2 decimal points

  let moviesLabel = 'All films'
  if (filters.yearFrom !== years[0] || filters.yearTo !== years[years.length-1]) {
    moviesLabel = `Films from ${filters.yearFrom} to ${filters.yearTo}`
  }

  return (
    <>
      <Navbar />
      <div className="px-10 lg:px-48 mb-48">
        <div className="flex flex-row mb-8">
          <PersonImage name={actor.name} width={140} height={209} src={actor.image_url} className="mr-6" />

          <div className="flex flex-col flex-grow mt-2">
            <div className="flex flex-row mb-4">
              <div>
                <h1 className="text-4xl font-medium tracking-wide text-gray-800">{actor.name}</h1>
              </div>
              <div className="ml-auto">
                <h1 className="bg-gray-400 border-2 border-gray-500 px-3 pt-1 rounded-md text-4xl font-medium tracking-wide text-gray-800">{average || 0}</h1>
              </div>
            </div>
            <div className="flex flex-row">
              <h2 className="text-2xl font-medium tracking-wide text-gray-600 mb-2">Actor</h2>
              <span className="ml-auto text-2xl font-medium tracking-wide text-gray-600 mb-1">Average rating</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8">{moviesLabel}</h1>
        <Chart data={filteredMovies}></Chart>

        <div className="flex flex-wrap mt-8">
          <SelectFilter label="From year:" options={years} filterKey="yearFrom" defaultValue={filters} onChange={setFilters} />
          <SelectFilter label="To year:" options={years} filterKey="yearTo" defaultValue={filters} onChange={setFilters} />
        </div>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8">Top films</h1>
        <Chart data={top}></Chart>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8">Worst films</h1>
        <Chart data={worst}></Chart>

        <hr className="my-12"></hr>

        <h1 className="text-2xl font-medium tracking-wide text-gray-800 mb-8">By decade</h1>
        <Chart data={decades}></Chart>
      </div>
    </>
  )
}
export default Person

function averageEachDecade(movies) {
  if (movies.length === 0) {
    return []
  }

  const window = 10
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
  return ranges.map(r => {
    const sel = movies.slice(r.istart, r.iend)
    const sum = sel.reduce((acc, m) => acc + m.rating, 0)
    return {
      label: r.decade + 's',
      // Average rounded to 2 decimal places
      value: Math.round(sum / sel.length * 10) / 10,
    }
  })
}

function toChartData(a) {
  return a.map(m => {
    return {
      label: m.title + ` (${m.year.toString()})`,
      value: m.rating
    }
  })
}

const SelectFilter = props => {
  const handleChange = evt => {
    props.onChange({
      ...props.defaultValue,
      [props.filterKey]: evt.target.value,
    })
  }

  const optionEls = props.options.map(o => <option key={o}> {o} </option>)

  return (
    <div className="mr-8">
      <p className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"> {props.label} </p>

      <div className="inline-block relative w-64">
        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={props.defaultValue[props.filterKey]}
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
