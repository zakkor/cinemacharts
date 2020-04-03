import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar'
import cameraImage from '../assets/images/camera.jpeg'

const Background = styled.div`
  background-image: url(${cameraImage});
  height: 100vh;
  width: 100%;
  position: absolute;
  filter: blur(6px);
  background-size: cover;
  background-position: center;
`

const LandingContainer = styled.div.attrs({
  className: "container mx-auto flex flex-col items-center justify-center px-4 h-screen" 
})`
  position: relative;
  top: -192px;
`

function Landing() {
  return (
    <div>
      <Background />
      <LandingContainer>
        <h1 className="font-medium md:text-5xl text-3xl tracking-wide text-gray-100 mb-16">Cinema Charts</h1> 
          <div className="max-w-3xl w-full">
            <SearchBar className="p-6 text-xl" />
          </div>
      </LandingContainer>
    </div>
  );
}

export default Landing;
