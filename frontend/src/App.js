import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'


export default function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>

          <Outlet />

        </Container>
      </main>
      <Footer />
      <Toaster position="top-center" />
    </>
  )
}