import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import { apiURL } from '../api'
import Navbar from '../components/Navbar'

function SearchResults(props) {
  const [results, setResults] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${apiURL}/search/${props.query}`)
      const data = await res.json()
      setResults(data)
    }
    fetchData()
  }, [props.query])

  const links = results.map(r =>
    <Link className="underline w-full lg:w-3/4 border-2 border-gray-400 rounded-md p-6 my-2 block text-xl text-gray-700" key={r._id} to={`/person/${r.movies_id}`}> {r.name} </Link>
  );

  return (
    <div>
      <Navbar />
      <div className="container px-8 lg:pl-48">
        {links}
      </div>
    </div>
  );
}

export default SearchResults;
