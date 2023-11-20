import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <Outlet />
      
    </h1>
  )
}