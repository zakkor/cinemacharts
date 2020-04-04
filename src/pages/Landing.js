import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { apiURL } from '../api'

import SearchBar from '../components/SearchBar'
import PersonImage from '../components/PersonImage'
import cameraImage from '../assets/images/camera.jpeg'

const Background = styled.div`
  background-image: url(${cameraImage});
  height: 100vh;
  width: 100%;
  position: absolute;
  filter: blur(6px);
  background-size: cover;
  background-position: center;
  z-index: -1;
`

const LandingContainer = styled.div.attrs({
  className: "container mx-auto flex flex-col items-center justify-center px-4 h-screen"
})`
  
`

function ActorCard({ actor }) {
  return (
    <Link to={`/person/${actor.movies_id}`}>
      <div className="flex flex-col text-center mx-4 mb-6">
        <PersonImage name={actor.name} className="inline-block" src={actor.image_url} />
        <div className="p-3 h-18 w-32 overflow-hidden">
          <span className="text-gray-200 text-xl font-medium"> {actor.name} </span>
        </div>
      </div>
    </Link>
  )
}

function Landing() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${apiURL}/randompeople`)
      const data = await res.json()
      setPeople(data)
    }
    fetchData()
  }, [])

  const { width } = window.screen
  if (people.length > 2 && width <= 375) {
    setPeople(people.slice(0, 2))
  }

  const peopleEls = people.map(p => <ActorCard key={p._id} actor={p}></ActorCard>)

  return (
    <div>
      <Background />
      <LandingContainer>
        <h1 className="font-medium md:text-5xl text-3xl tracking-wider text-gray-100 mb-8 sm:mb-16">Cinema Charts</h1>
        <div className="max-w-3xl w-5/6 sm:w-2/3">
          <SearchBar className="p-3 sm:p-4 text-md sm:text-xl" />
        </div>
        <div className="flex flex-wrap justify-center mt-8 sm:mt-16 max-w-3xl">

          {peopleEls}

        </div>

      </LandingContainer>
    </div>
  );
}

export default Landing;
