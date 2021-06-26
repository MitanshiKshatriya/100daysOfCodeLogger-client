import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types' 

import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Card, 
  Button, 
  CardTitle, 
  CardText, 
  Row, 
  Col 
} from 'reactstrap';


class Goals extends Component {
  state = {
    totalGoals: 6
  }

  render() {
    return (
      <>
        <div className="container3">

        </div>
      </>
    )
  }
}

Goals.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading
})


export default connect(
  mapStateToProps, {})
  (Goals)


