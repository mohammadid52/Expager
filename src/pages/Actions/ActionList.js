/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import React from 'react';
import { map, orderBy } from 'lodash';
import { createdAt, getSubStringTitle } from '../../helpers';

const ExpenseList = ({ wallet, onExpense }) => {
  const {
    details: { account },
  } = wallet;
  const { expenseList, earningsList } = account;
  const list = onExpense ? expenseList : earningsList;
  const orderedList = orderBy(list, ['createdAt'], 'desc');

  return (
    <div className="transaction">
      <div className="transaction-list-header">
        <div>Title</div>
        <div>Vendor</div>
        <div>Date</div>
        <div>Amount</div>
      </div>
      <ul className="transaction-list-container">
        {map(orderedList, (value) => (
          <li className="transaction-list">
            <div>{getSubStringTitle(value.title)}</div>
            <div>{value.vendor}</div>
            <div>{createdAt(value.createdAt)}</div>
            <div>₹ {value.expenseAmt || value.earningsAmt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ExpenseList.defaultProps = {
  onExpense: false,
};

ExpenseList.propTypes = {
  wallet: PropTypes.object.isRequired,
  onExpense: PropTypes.bool,
};
export default ExpenseList;
