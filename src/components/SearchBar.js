import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { navigate } from '@reach/router'
import { s, f } from '../values.js'

const StyledSearchBar = styled.input`
  border: 1px solid grey;
  border-radius: 4px;
  width: 60%;
  font-size: ${f[0]};
  padding: ${s[0]};

  ${props => props.large && css`
    font-size: ${f[1]};
    padding: ${s[1]};
  `}
`

function SearchBar(props) {
  const [value, setValue] = useState(props.value)

  const searchOnEnter = evt => {
    // Only on Enter key
    if (evt.keyCode !== 13) {
      return
    }
    const query = evt.target.value
    if (query === '') {
      return
    }

    navigate(`/search/${query}`)
  }

  return (
    <StyledSearchBar large={props.large}
      value={value} 
      onChange={evt => setValue(evt.target.value)}
      onKeyUp={searchOnEnter} />
  )
}

export default SearchBar