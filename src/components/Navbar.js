import React from 'react'
import { Link } from '@reach/router'
import SearchBar from '../components/SearchBar'

function Navbar(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6 mb-8">
      
      <div className="flex items-center flex-shrink-0 text-white mb-1 ml-2">
        <Link className="font-medium text-xl tracking-wide" to="/"> CinemaCharts </Link>
      </div>

      <div className="mt-4 ml-2 lg:ml-6 lg:mt-0 w-full block flex-grow lg:flex lg:items-center lg:w-auto"> <div className="lg:flex-grow">
          <div className="lg:max-w-2xl">
            <SearchBar className="p-3" value={props.query} />
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar