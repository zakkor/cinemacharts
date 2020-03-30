import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { s, f } from './Values'
import SearchBar from './SearchBar'

const Result = styled.a`
  padding: ${s[1]};
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${s[2]};
  margin-left: ${s[2]};
`

function SearchResults(props) {
  const [results, setResults] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/search/${props.query}`)
      const data = await res.json()
      setResults(data)
    }
    fetchData()
  }, [props.query])

  const links = results.map(r =>
    <li key={r._id}>
      <Link to={`/person/${r._id}`}> {r.actor} </Link>
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
