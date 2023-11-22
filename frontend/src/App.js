import React from 'react'
import { Outlet } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
    <Header />
    <Container>
    <h1 className="text-3xl font-bold underline">
      <Outlet />
      
    </h1>
    </Container>
    <Footer />
    </>
  )
}