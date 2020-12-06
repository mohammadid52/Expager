/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { getBalance } from '../../helpers';

const QuickWallet = ({ account }) => {
  const { initialBalance, walletBalance } = getBalance(account);

  const balanceDifference = walletBalance - initialBalance;

  const changeInPercentage = (balanceDifference / initialBalance) * 100;

  const getChangeInWallet = () => {
    if (balanceDifference < 1) {
      return 'negative';
    }
    if (balanceDifference === 0) {
      return 'no change';
    }

    return 'positive';
  };

  return (
    <div className="quick-wallet-container">
      <div className="activity-ratio">
        <p className="overall-change">Overall Change</p>
        <p className="quick-wallet-total">
          {getChangeInWallet() === 'negative' ? (
            <MdArrowDropDown color="var(--error-clr)" />
          ) : getChangeInWallet() === 'positive' ? (
            <MdArrowDropUp color="var(--success-clr)" />
          ) : (
            ''
          )}
          {Math.abs(Math.ceil(changeInPercentage))}%
        </p>
      </div>
      <div>
        <p className="quick-wallet-total">
          <span className={balanceDifference > 1 ? 'More' : balanceDifference < 1 ? 'Less' : ''}>
            &#8377; {Math.abs(balanceDifference)}{' '}
          </span>
          {balanceDifference > 1 ? 'More' : balanceDifference < 1 ? 'Less' : 'No Changes'} from
          initial balance
        </p>
        <p className="quick-wallet-total">
          <span className="quick-wallet-bal">&#8377; {Math.abs(walletBalance)} </span>
          Wallet Balance
        </p>
      </div>
    </div>
  );
};

QuickWallet.defaultProps = {
  account: {},
};

QuickWallet.propTypes = {
  account: PropTypes.shape({
    totalEarnings: PropTypes.any,
    totalExpenses: PropTypes.any,
    walletBalance: PropTypes.any,
  }),
};

export default QuickWallet;
