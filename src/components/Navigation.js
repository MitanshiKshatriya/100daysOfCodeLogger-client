import React, { useState } from 'react';
import {MdAccountCircle} from 'react-icons/md'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';
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
    <div className="container">
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">#100DaysOfCode Logger</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navmargin" navbar>
            <NavItem>
              <NavLink href="/resources">Get Inspired</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/loglist">Log List</NavLink>
            </NavItem>
            {
              props.isAuthenticated ? 
              (
                <>
                {/* <NavbarText> {props.user ? 'Welcome '+props.user.name : ''}</NavbarText>
                <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <NavbarText>{props.user.name+" "}</NavbarText>
                <MdAccountCircle 
                  className="profile-icon" size="1.5em"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/profile">Profile</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
          </Nav>
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