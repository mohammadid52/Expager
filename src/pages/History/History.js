import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { map, orderBy, has } from 'lodash';

import { getOtherValues, sidebarMinified, createdAt, getSubStringTitle } from '../../helpers';
import './History.css';

const History = ({ data }) => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));
  const {
    details: { account },
  } = data;
  const { expenseList, earningsList } = account;
  const historyList = [...expenseList, ...earningsList];
  const orderedList = orderBy(historyList, ['createdAt'], 'desc');

  const isExpense = (value) => has(value, 'expenseAmt');

  return (
    <Wrapper className={`${sidebarMinified(isSidebarMin)} content`}>
      <h1 className="page-title">History</h1>
      <div className="card history">
        <div className="history-list-header">
          <div>Title</div>
          <div>Vendor</div>
          <div>Date</div>
          <div>Amount</div>
        </div>
        <div className="history-list-container">
          {map(orderedList, (value) => (
            <div className={`history-list ${isExpense(value) ? 'history-list-expense' : ''}`}>
              <div>{getSubStringTitle(value.title)}</div>
              <div>{value.vendor}</div>
              <div>{createdAt(value.createdAt)}</div>
              <div>₹ {value.expenseAmt || value.earningsAmt}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="history-guide">
        <div className="guide-expense">
          <div />
          <p>Expense</p>
        </div>
        <div className="guide-earnings">
          <div />
          <p>Earnings</p>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default History;
