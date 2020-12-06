import React from 'react';
import { getLastSevenDays, getTotalEarningsBalance, getTotalExpenseBalance } from '../../helpers';
import './Activity.css';

const WeeklyChange = ({ account }) => {
  const { expenseList, earningsList } = account;

  const lastWeekDataExpense = getLastSevenDays(expenseList);
  const lastWeekDataEarnings = getLastSevenDays(earningsList);
  const totalExpenseOfLastWeek = getTotalExpenseBalance(lastWeekDataExpense);
  const totalEarningsOfLastWeek = getTotalEarningsBalance(lastWeekDataEarnings);

  return (
    <div className="activity-change weekly">
      <p>
        spent this week: <span>&#8377; {totalExpenseOfLastWeek}</span>
      </p>
      <p>
        earned this week: <span>&#8377; {totalEarningsOfLastWeek}</span>
      </p>
    </div>
  );
};

export default WeeklyChange;
