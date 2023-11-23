import React from 'react'
import { Link } from 'react-router-dom'

const SentenceSearchPage = () => {
  return (
    <div>SentenceSearchPage

      
<Link to="/login?redirect=/sentence">
        <button >
          Add/Update Sentences
        </button>
      </Link>
    </div>
  )
}

export default SentenceSearchPage