import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { navigate } from '@reach/router'

const StyledSearchBar = styled.input.attrs({
  className: "border-2 border-solid border-gray-600 rounded-md text-gray-700 w-full text-1md"
})`
  &:focus {
    outline: none;
  }
  ${props => props.large && css`
    font-size: 1.25rem;
    padding: 1rem;
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
    <StyledSearchBar
      className={props.className}
      placeholder='Search for actors...'
      defaultValue={value}
      onChange={evt => setValue(evt.target.value)}
      onKeyUp={searchOnEnter}
    />
  )
}

export default SearchBar