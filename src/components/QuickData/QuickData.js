import PropTypes from 'prop-types';
import React from 'react';
import './QuickData.css';
import { orderBy } from 'lodash';
import ProgressCircle from './ProgressCircle';
import { isExpense, getBalance } from '../../helpers';

const QuickExpense = ({ account, onEarnings }) => {
  const { expenseList, earningsList } = account;
  const { initialBalance, totalEarnings, totalExpenses } = getBalance(account);

  const renderList = onEarnings ? earningsList : expenseList;
  const orderedList = orderBy(renderList, ['createdAt'], 'desc');
  const lastRecord = orderedList[0];

  const lastAmount = <span>{onEarnings ? lastRecord.earningsAmt : lastRecord.expenseAmt}</span>;

  const data = {
    initialBalance,
    total: onEarnings ? totalEarnings : totalExpenses,
  };
  return (
    <div className="quick-data-container">
      <div className="progress-circle">
        <ProgressCircle onEarnings={onEarnings} data={data} radius={60} stroke={4} />
      </div>

      <div className="quick-data">
        <p className={`total-expense ${onEarnings ? 'total-earnings' : ''}`}>
          Your total {isExpense(null, null, !onEarnings)}: &#8377;{' '}
          {onEarnings ? totalEarnings : totalExpenses}
        </p>
        <p className="last-expense">
          Your last {isExpense(null, null, !onEarnings)}: &#8377; {lastAmount}
        </p>

        <div className="quick-data-guide">
          <div className={`quick-data-guide-${!onEarnings ? 'earnings' : 'expense'}`}>
            <div />
            <p>{!onEarnings ? 'Expense' : 'Earnings'}</p>
          </div>
          <div className={`quick-data-guide-${onEarnings ? 'earnings' : 'expense'}`}>
            <div />
            <p>{onEarnings ? 'Expense' : 'Earnings'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

QuickExpense.defaultProps = {
  account: {},
  onEarnings: false,
};

QuickExpense.propTypes = {
  account: PropTypes.shape({
    earningsList: PropTypes.any,
    expenseList: PropTypes.any,
    totalEarnings: PropTypes.any,
    totalExpenses: PropTypes.any,
    walletBalance: PropTypes.any,
  }),
  onEarnings: PropTypes.any,
};

export default QuickExpense;
