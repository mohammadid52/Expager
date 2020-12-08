/* eslint-disable implicit-arrow-linebreak */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getOtherValues, sidebarMinified, isExpense } from '../../helpers';
import AddAmout from './AddAmout';
import ActionList from './ActionList';
import { NoData } from '../../components';
import './Action.css';

const Expense = ({ data }) => {
  const { pathname } = useLocation();

  const onExpense = pathname === '/expenses';

  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  const {
    details: { account },
  } = data;
  const { expenseList, earningsList } = account;

  const isDataEmpty = onExpense ? !expenseList.length : !earningsList.length;

  return (
    <section className={`${sidebarMinified(isSidebarMin)} content action-container`}>
      <h1 className="page-title">{isExpense(null, null, onExpense)}</h1>
      <div className="card action-data">
        {isDataEmpty ? (
          <NoData subtitle={`Add ${onExpense ? 'expense' : 'earnings'} to see list`} />
        ) : (
          <ActionList wallet={data} onExpense={onExpense} />
        )}
      </div>

      <AddAmout wallet={data} onExpense={onExpense} />
    </section>
  );
};

Expense.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Expense;
