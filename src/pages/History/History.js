import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { map, has } from 'lodash';
import { Guide, Search, SortData, NoData } from '../../components';

import {
  getOtherValues,
  sidebarMinified,
  createdAt,
  getSubStringTitle,
  sortData,
  getWalletState,
  searchData,
} from '../../helpers';
import './History.css';

const History = ({ data }) => {
  const { isSidebarMin, sortBy } = useSelector((state) => getOtherValues(state));
  const { searchText } = useSelector((state) => getWalletState(state));
  const {
    details: { account },
  } = data;
  const { expenseList, earningsList } = account;
  const historyList = [...expenseList, ...earningsList];

  const isExpense = (value) => has(value, 'expenseAmt');

  const allData = sortData(historyList, sortBy);
  const searchedData = searchData(allData, searchText);
  const dataList = searchText ? searchedData : allData;

  return (
    <section className={`${sidebarMinified(isSidebarMin)} content`}>
      <h1 className="page-title">History</h1>
      {dataList ? (
        <div className="card history">
          <div className="history-list-header">
            <div>Title</div>
            <div>Vendor</div>
            <div>Date</div>
            <div>Amount</div>
          </div>
          <div className="history-list-container">
            {map(dataList, (value) => (
              <div className={`history-list ${isExpense(value) ? 'history-list-expense' : ''}`}>
                <div>{getSubStringTitle(value.title)}</div>
                <div>{value.vendor}</div>
                <div>{createdAt(value.createdAt)}</div>
                <div>₹ {value.expenseAmt || value.earningsAmt}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card history">
          <NoData title="Sorry, Can't find what you're looking for" />
        </div>
      )}
      <Search />
      <div className="history-actions">
        <Guide text1="Expense" text2="Earnings" className="margin" />
        <SortData />
      </div>
    </section>
  );
};

History.propTypes = {
  data: PropTypes.any.isRequired,
};

export default History;
