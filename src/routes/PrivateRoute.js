import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { getAuth } from '../helpers';

const PrivateRoute = ({ path, isPublic, children, ...rest }) => {
  const { isLoaded, uid, isEmpty } = useSelector((state) => getAuth(state));
  const isUser = isLoaded && uid && !isEmpty;

  const onPublic = (isuser) => {
    if (isuser) {
      return <Redirect to="/" />;
    }
    return children;
  };
  const onPrivate = (isuser) => {
    if (isuser) {
      return children;
    }

    return <Redirect to="/login" />;
  };

  if (isPublic) {
    return <Route {...rest} render={() => onPublic(isUser)} />;
  }
  return <Route {...rest} render={() => onPrivate(isUser)} />;
};

PrivateRoute.defaultProps = {
  isPublic: false,
};

PrivateRoute.propTypes = {
  isPublic: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
