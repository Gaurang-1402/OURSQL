import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'
const Header = () => {
  const { userInfo } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()


  const logoutHandler = async () => {
    try {

      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Panopticon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              {
                userInfo ? (
                  <>
                    <LinkContainer to='/'>
                      <Nav.Link>
                        <FaUser /> {userInfo.name}
                      </Nav.Link>
                    </LinkContainer>
                    <Button className='pl-5' variant='primary' onClick={logoutHandler}>Logout</Button>
                  </>

                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header