import React from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Loader } from '../../components';
import { getAuth } from '../../helpers';

const DataWrapper = ({ data, children }) => {
  const { uid } = useSelector((state) => getAuth(state));

  function loadData(detail) {
    if (uid) {
      if (isEmpty(detail)) {
        return false;
      }
      return true;
    }
    return true;
  }
  const isDataLoaded = loadData(data.details);
  if (!isDataLoaded) {
    return <Loader />;
  }

  return children;
};

export default DataWrapper;
