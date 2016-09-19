import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import classNames from 'classnames'

const Header = ({children, location}) => {
  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#/about'>Surf Bot</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem id='sites' className={classNames({ active: location.pathname === '/' }) } href='#/'>
              Sites
            </NavItem>
            <NavItem id='bots' className={classNames({ active: location.pathname === '/bots' }) } href='#/bots'>
            Bots
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>{children}</div>
    </div >
  )
}
Header.propTypes = {
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired
}

export default Header
