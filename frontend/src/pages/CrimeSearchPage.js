import React from 'react'
import { Link } from 'react-router-dom'

const CrimeSearchPage = () => {
  return (
    <div>CrimeSearchPage
      <Link to="/login?redirect=/crime">
        <button >
          Add/Update Crime Charges
        </button>
      </Link>

    </div>
  )
}

export default CrimeSearchPage