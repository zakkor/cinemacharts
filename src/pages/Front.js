import React from 'react'
import styled from 'styled-components'
import { s, f } from '../values.js'
import SearchBar from '../components/SearchBar'

const SearchContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  top: -${s[6]};
`

const Title = styled.h1`
  font-size: ${f[2]};
  font-weight: 400;
  margin-bottom: ${s[3]};
`

function Search() {
  return (
    <SearchContainer>
      <Title>Cinema Charts</Title>
      <SearchBar large/>
    </SearchContainer>
  );
}

export default Search;
