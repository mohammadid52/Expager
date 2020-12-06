import React from 'react';
import { getLastMonth, getTotalExpenseBalance, getTotalEarningsBalance } from '../../helpers';

const MonthlyChange = ({ account }) => {
  const { expenseList, earningsList } = account;
  const lastMonthExpenseData = getLastMonth(expenseList);
  const lastMonthEarningsData = getLastMonth(earningsList);
  const totalOfLastMonthExpense = getTotalExpenseBalance(lastMonthExpenseData);
  const totalOfLastMonthEarnings = getTotalEarningsBalance(lastMonthEarningsData);

  return (
    <div className="activity-change monthly">
      <p>
        spent this month: <span>&#8377; {totalOfLastMonthExpense}</span>
      </p>
      <p>
        earned this month: <span>&#8377; {totalOfLastMonthEarnings}</span>
      </p>
    </div>
  );
};

export default MonthlyChange;
