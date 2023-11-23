import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const HomePage = () => {
  return (
    <div>
      <Link to='/login?redirect=/crime/search'>
        <Button variant="secondary" >
          Search Crimes
        </Button>
      </Link>
      <Link to="/login?redirect=/criminal/search">
        <Button variant="secondary" >
          Search Criminals
        </Button>
      </Link>
      <Link to="/login?redirect=/officer/search">
        <Button variant="secondary" >
          Search Officers
        </Button>
      </Link>
      <Link to="/login?redirect=/probation-officer/search">
        <Button variant="secondary" >
          Search Probation Officers
        </Button>
      </Link>
      <Link to="/login?redirect=/sentence/search">
        <Button variant="secondary" >
          Search Sentences
        </Button>
      </Link>
      <Link to="/login?redirect=/appeal/search">
        <Button variant="secondary" >
          Search Appeals
        </Button>
      </Link>
      <Link to="/login?redirect=/crime-charge/search">
        <Button variant="secondary" >
          Search Crime Charges
        </Button>
      </Link>
    </div>
  )
}

export default HomePage