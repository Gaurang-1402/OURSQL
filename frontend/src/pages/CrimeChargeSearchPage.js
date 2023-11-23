import React from 'react'
import { Link } from 'react-router-dom'

const CrimeChargeSearchPage = () => {
  return (
    <div>CrimeChargeSearchPage

      <Link to="/login?redirect=/crime-charge">
        <button >
          Add/Update Crime Charges
        </button>
      </Link>
    </div>
  )
}

export default CrimeChargeSearchPage