import React from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../../helpers';
import { Loader } from '../../components';

const AuthWrapper = ({ children }) => {
  const { isLoaded } = useSelector((state) => getAuth(state));

  if (!isLoaded) {
    return <Loader />;
  }
  return children;
};

export default AuthWrapper;
