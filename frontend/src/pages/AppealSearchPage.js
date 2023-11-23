import React from 'react'
import { Link } from 'react-router-dom'

const AppealSearchPage = () => {
  return (
    <div>AppealSearchPage

      <Link to="/login?redirect=/appeal">
        <button >
          Add/Update Appeals
        </button>
      </Link>
    </div>
  )
}

export default AppealSearchPage