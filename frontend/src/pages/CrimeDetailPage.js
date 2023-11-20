import { useParams } from 'react-router-dom'
// get the id from the URL

import React from 'react'

const CrimeDetailPage = () => {
    const { id: crimeId } = useParams()
  return (
    <div>CrimeDetailPage</div>
  )
}

export default CrimeDetailPage