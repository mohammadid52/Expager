import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { getAuth } from '../helpers';

const PrivateRoute = ({ isPublic, children, ...rest }) => {
  const { isLoaded, uid, isEmpty } = useSelector((state) => getAuth(state));
  const isUser = isLoaded && uid && !isEmpty;
  if (isPublic) {
    return <Route {...rest} render={() => (isUser ? <Redirect to="/" /> : children)} />;
  }
  return <Route {...rest} render={() => (isUser ? children : <Redirect to="/login" />)} />;
};

PrivateRoute.defaultProps = {
  isPublic: false,
};

PrivateRoute.propTypes = {
  isPublic: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
