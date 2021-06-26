import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { isLogin } from '../actions/authActions';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            localStorage.getItem("token") ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

// export default PrivateRoute;
// export default Navigation;
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
  }
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
  export default connect(
    mapStateToProps,
    {isLogin}
  )(PrivateRoute)