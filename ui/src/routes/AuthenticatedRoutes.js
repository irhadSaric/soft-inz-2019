import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AuthenticatedRoutes = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

AuthenticatedRoutes.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.sessionToken && state.user.sessionToken !== null,
  };
}

export default connect(mapStateToProps, {})(AuthenticatedRoutes);
