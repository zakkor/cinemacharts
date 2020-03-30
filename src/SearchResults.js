import React from 'react'
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
  return (
    <div>
      <SearchBar value={props.query} />
      <Results>
        <Link to="/person/Robert De Niro" >Robert De Niro</Link>
        <Link to="/person/Robert De Niro" >Robert De Niro</Link>
      </Results>
    </div>
  );
}

export default SearchResults;
