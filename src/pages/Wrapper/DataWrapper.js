import React from 'react';
import { isEmpty } from 'lodash';
import { Loader } from '../../components';

const DataWrapper = ({ data, children }) => {
  function loadData(details) {
    if (isEmpty(details)) {
      return false;
    }
    return true;
  }
  const isDataLoaded = loadData(data);
  if (!isDataLoaded) {
    return <Loader />;
  }

  return children;
};

export default DataWrapper;
