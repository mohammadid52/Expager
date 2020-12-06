import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { NoData, QuickDataCards } from '../../components';

const RightSide = ({ wallet }) => {
  const {
    details: { account },
  } = wallet;

  const { expenseList, earningsList } = account;
  return (
    <div className="right-profile">
      <p className="small-heading">Your Expenses</p>
      <div className="card quick-expenses">
        {isEmpty(expenseList) ? <NoData /> : <QuickDataCards.Data account={account} />}
      </div>

      <p className="small-heading">Your Earnings</p>
      <div className="card quick-earnings">
        {isEmpty(earningsList) ? <NoData /> : <QuickDataCards.Data onEarnings account={account} />}
      </div>

      <p className="small-heading">Your Wallet</p>
      <div className="card quick-wallet">
        {isEmpty(earningsList) ? <NoData /> : <QuickDataCards.Wallet account={account} />}
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
