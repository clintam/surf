import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

const Header = ({children, location}) => {
  return (
    <div>
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>
            <div className='navbar-brand'>
              Surf bot
            </div>
          </div>

          <ul className='nav navbar-nav'>
            <li className={classNames({active: location.pathname === '/'})}>
              <Link to={'/'}>Sites</Link>
            </li>
            <li className={classNames({active: location.pathname === '/bots'})}>
              <Link to={'/bots'}>Bots</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>{children}</div>
    </div >
  )
}
Header.propTypes = {
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired
}

export default Header
