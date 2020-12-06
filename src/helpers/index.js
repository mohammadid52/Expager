/* eslint-disable function-paren-newline */
/* eslint-disable no-plusplus */
/* eslint-disable implicit-arrow-linebreak */
import { filter, get, includes, map, reduce, isEmpty } from 'lodash';
import moment from 'moment';

export const getAuth = (state) => get(state, 'firebase.auth', {});
export const getLocalAuthState = (state) => get(state, 'auth', {});
export const getWalletState = (state) => get(state, 'wallet', {});
export const getDetails = (state) => get(state, 'firestore.data.details', []);
export const getOtherValues = (state) => get(state, 'other', {});
export const getWalletData = (state) => get(state, 'wallet.data', {});

export const addKeyWordExpenseData = (account, values) => {
  const arr = [];
  if (!includes(account.expenseKeywords.title, values.title)) {
    arr.push(values.title);
  }
  if (!includes(account.expenseKeywords.vendor, values.vendor)) {
    arr.push(values.vendor);
  }
  return arr;
};

export const sidebarMinified = (isMin) => (isMin ? 'maxified-content' : '');

export const isExpense = (onCondition1, onCondition2, bool) => {
  if (!onCondition1 && !onCondition2) {
    return bool ? 'Expense' : 'Earnings';
  }
  return bool ? onCondition1 : onCondition2;
};
export const getSubStringTitle = (title) => {
  if (title.length < 20) {
    return title;
  }
  return `${title.substring(0, 20)}...`;
};
export const createdAt = (date) => moment(date.toDate()).format('ll');

const getDates = (period) => {
  const arr = [];
  for (let i = 0; i <= period; i++) {
    const date = moment().subtract(i, 'd').format('ll');
    arr.push(date);
  }
  return arr;
};

export const getLastSevenDays = (data) => {
  const weekList = getDates(7);

  const getFilteredList = filter(data, (item) =>
    map(weekList, (week) => createdAt(item.createdAt) === week),
  );
  return getFilteredList;
};

export const getBalance = (data) => {
  const { walletBalance, totalExpenses, totalEarnings } = data;
  const initialBalance = walletBalance + totalExpenses - totalEarnings;
  return { initialBalance, totalExpenses, totalEarnings, walletBalance };
};

export const getLastMonth = (data) => {
  const monthList = getDates(30);

  const filteredList = filter(data, (item) =>
    map(monthList, (month) => createdAt(item.createdAt) === month),
  );
  return filteredList;
};

export const getTotalExpenseBalance = (data) =>
  reduce(data, (prev, current) => prev + current.expenseAmt, 0);

export const getTotalEarningsBalance = (data) =>
  reduce(data, (prev, current) => prev + current.earningsAmt, 0);

export const isDataEmpty = (data, isExpense) => {
  if (isExpense) {
    isEmpty(data.expenseList);
  }

  return isEmpty(data.earningsList);
};
