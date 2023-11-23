import React from 'react'
import { Link } from 'react-router-dom'

const CriminalSearchPage = () => {
  return (
    <div>CriminalSearchPage

<Link to="/login?redirect=/criminal">
        <button >
          Add/Update Criminals
        </button>
      </Link>
    </div>
  )
}

export default CriminalSearchPage