import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import { apiURL } from '../api'
import SearchBar from '../components/SearchBar'

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
    <li key={r._id}>
      <Link to={`/person/${r._id}`}> {r.actor.name} </Link>
    </li>
  );

  return (
    <div>
      <SearchBar value={props.query} />
      <ul>
        {links}
      </ul>
    </div>
  );
}

export default SearchResults;
