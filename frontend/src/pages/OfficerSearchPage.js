import React from 'react'
import { Link } from 'react-router-dom'

const OfficerSearchPage = () => {
  return (
    <div>OfficerSearchPage


      <Link to="/login?redirect=/officer">
        <button >
          Add/Update Officers
        </button>
      </Link>
    </div>
  )
}

export default OfficerSearchPage