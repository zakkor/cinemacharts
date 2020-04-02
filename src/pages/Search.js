import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import { apiURL } from '../api'
import Navbar from '../components/Navbar'
import ActorImage from '../components/ActorImage'

function Search(props) {
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
    <Link to={`/person/${r.movies_id}`} key={r._id}>
      <div className="flex flex-row border-2 border-gray-400 rounded-md p-6 my-2">
        <ActorImage name={r.name} width={60} height={90} src={r.image_url} className="mr-4" />
        <span className="self-center underline w-full lg:w-3/4 block text-xl text-gray-700" > {r.name} </span>
      </div>
    </Link>
  );

  return (
    <div>
      <Navbar query={props.query} />
      <div className="container px-8 lg:pl-48">
        <h2 className="ml-auto text-2xl font-medium tracking-wide text-gray-600 mb-4">{results.length} results</h2>
        {links}
      </div>
    </div>
  );
}

export default Search;
