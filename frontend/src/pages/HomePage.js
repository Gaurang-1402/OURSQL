import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Link to='/login?redirect=/crime/search'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search Crimes
        </button>
      </Link>
      <Link to="/login?redirect=/criminal/search">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search Criminals
        </button>
      </Link>
      <Link to="/login?redirect=/officer/search">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search Officers
        </button>
      </Link>
      <Link to="/login?redirect=/probation-officer/search">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search Probation Officers
        </button>
      </Link>
    </div>
  )
}

export default HomePage