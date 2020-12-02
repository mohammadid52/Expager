/* eslint-disable implicit-arrow-linebreak */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { getOtherValues } from '../../helpers';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import './Expense.css';

const Expense = ({ data }) => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return (
    <section className={`${isSidebarMin ? 'maxified-content' : ''} content expense-container`}>
      <h1 className="page-title">Expenses</h1>
      <div className="card expense no-data">
        <div>
          <div>No Data</div>
          <div>Add expense to see data</div>
        </div>
      </div>
      <ExpenseList wallet={data} />
      <AddExpense wallet={data} />
    </section>
  );
};

Expense.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Expense;
