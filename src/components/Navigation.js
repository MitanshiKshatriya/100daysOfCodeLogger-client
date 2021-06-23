import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'

const Navigation = (props) => {

  let history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    props.logout()
    history.push('/')
  }

  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">#100DaysOfCode Logger</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/resources">Get Inspired</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/loglist">Log Today</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/loglist">Log List</NavLink>
            </NavItem>
            {
              props.isAuthenticated ? 
              (
                <>
                <NavbarText> {props.user ? 'Welcome '+props.user.name : ''}</NavbarText>
                <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
            </>
              ) : 
              (
                <>
                <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Signup</NavLink>
            </NavItem>
            </>
              )
            }
            {/* <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Signup</NavLink>
            </NavItem> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

// export default Navigation;
Navigation.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error,
  logout: PropTypes.func.isRequired
})

export default connect(
  mapStateToProps,
  {logout}
)(Navigation)