import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const Metabar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Nav.Link href="/">🚀 Ticket Guru Demo</Nav.Link>
        </Navbar.Brand>
      </Navbar>
    </>
  )
}
