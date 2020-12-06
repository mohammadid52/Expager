import PropTypes from 'prop-types';
import React from 'react';

const NoData = ({ title, subtitle }) => (
  <div className="no-data">
    <div>
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  </div>
);
NoData.defaultProps = {
  subtitle: '',
  title: 'No Data',
};
NoData.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default NoData;
