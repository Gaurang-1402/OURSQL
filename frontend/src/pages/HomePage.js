import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Link to='/login?redirect=/crime/search'>
        <button >
          Search Crimes
        </button>
      </Link>
      <Link to="/login?redirect=/criminal/search">
        <button >
          Search Criminals
        </button>
      </Link>
      <Link to="/login?redirect=/officer/search">
        <button >
          Search Officers
        </button>
      </Link>
      <Link to="/login?redirect=/probation-officer/search">
        <button >
          Search Probation Officers
        </button>
      </Link>
      <Link to="/login?redirect=/sentence/search">
        <button >
          Search Sentences
        </button>
      </Link>
      <Link to="/login?redirect=/appeal/search">
        <button >
          Search Appeals
        </button>
      </Link>
      <Link to="/login?redirect=/crime-charge/search">
        <button >
          Search Crime Charges
        </button>
      </Link>
    </div>
  )
}

export default HomePage