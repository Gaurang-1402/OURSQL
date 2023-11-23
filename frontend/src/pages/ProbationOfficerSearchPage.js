import React from 'react'
import { Link } from 'react-router-dom'

const ProbationOfficerSearchPage = () => {
  return (
    <div>ProbationOfficerSearchPage


      <Link to="/login?redirect=/probation-officer">
        <button >
          Add/Update Probation Officers
        </button>
      </Link>
    </div>
  )
}

export default ProbationOfficerSearchPage