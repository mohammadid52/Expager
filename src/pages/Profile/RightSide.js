import React from 'react';
import PropTypes from 'prop-types';

import { getNoDataClass } from '../../helpers';

const RightSide = ({ wallet }) => {
  const { details } = wallet;

  return (
    <div className="right-profile">
      <p className="small-heading">Your Earnings</p>
      <div className={`card expenses ${getNoDataClass(details) ? 'no-data' : ''}`}>
        {getNoDataClass(details) && <p>No Data</p>}
      </div>
      <p className="small-heading">Your Expenses</p>

      <div className={`card earnings ${getNoDataClass(details, true) ? 'no-data' : ''}`}>
        {getNoDataClass(details, true) && <p>No Data</p>}
      </div>
    </div>
  );
};

RightSide.propTypes = {
  wallet: PropTypes.shape({
    details: PropTypes.any.isRequired,
  }).isRequired,
};

export default RightSide;
