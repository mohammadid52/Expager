/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import React from 'react';

import './FloatingWallet.css';
import { Link } from 'react-router-dom';

const FloatingWallet = ({ data: { isDataLoaded, details } }) => {
  if (!isDataLoaded) {
    return null;
  }
  const { walletBalance } = details.account;
  return (
    <Link to="/dashboard">
      <button type="button" className="floating-btn">
        <div className="floating-btn-content">
          <div>&#8377; {walletBalance || 0}</div>
        </div>
      </button>
    </Link>
  );
};

FloatingWallet.propTypes = {
  data: PropTypes.any.isRequired,
};
export default FloatingWallet;
