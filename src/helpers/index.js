/* eslint-disable function-paren-newline */
/* eslint-disable no-plusplus */
/* eslint-disable implicit-arrow-linebreak */
import { filter, get, includes, map, reduce, groupBy, keys, orderBy } from 'lodash';
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
export const createdAtByDay = (date) => moment(date.toDate()).format('ddd');

const getDates = (period, format = 'll') => {
  const arr = [];
  for (let i = 0; i <= period; i++) {
    const date = moment().subtract(i, 'd').format(format);
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

export const getDataForGraphForExpense = (data) => {
  const dateWiseData = groupBy(
    data.map((d) => ({ ...d, createdAt: createdAt(d.createdAt) })),
    'createdAt',
  );

  const dateExpense = map(keys(dateWiseData), (key) => {
    const items = dateWiseData[key];
    const totalAmount = getTotalExpenseBalance(items);
    return { date: key, value: totalAmount };
  });

  return dateExpense;
};
export const getDataForGraphForEarnings = (data) => {
  const dateWiseData = groupBy(
    data.map((d) => ({ ...d, createdAt: createdAtByDay(d.createdAt) })),
    'createdAt',
  );

  const dateExpense = map(keys(dateWiseData), (key) => {
    const items = dateWiseData[key];
    const totalAmount = getTotalEarningsBalance(items);
    return { date: key, value: totalAmount };
  });

  return dateExpense;
};

export const extractKeys = (data) => {
  const dateWiseData = groupBy(
    data.map((d) => ({ ...d, createdAt: createdAtByDay(d.createdAt) })),
    'createdAt',
  );

  return keys(dateWiseData);
};

export const getToday = (format = 'ddd') => moment().format(format);

const getFilteredList = (data, match) =>
  filter(data, (item) => createdAtByDay(item.createdAt) === match);

export const getExpenseOfDay = (data, date) => getTotalExpenseBalance(getFilteredList(data, date));
export const getEarningsOfDay = (data, date) =>
  getTotalEarningsBalance(getFilteredList(data, date));

export const sortData = (data, value) => {
  const sortBy = value === 'oldest' ? 'asc' : 'desc';

  return orderBy(data, ['createdAt'], sortBy);
};

export const combinations = (data, numberAmt) => {
  const lowerCaseTitle = data.title.toLowerCase();
  const lowerCaseVendor = data.vendor.toLowerCase();
  const titleInWords = lowerCaseTitle.split(' ');
  const vendorInWords = lowerCaseVendor.split(' ');
  const trimmed = (str) => str.replace(/\s+/g, '');
  const titleInLetters = trimmed(lowerCaseTitle).split('');
  const vendorInLetters = trimmed(lowerCaseTitle).split('');
  const date = moment().format('ll').toLowerCase();
  const splitDate = date.split(' ');
  titleInWords.push(
    lowerCaseTitle,
    lowerCaseVendor,
    ...vendorInWords,
    ...splitDate,
    ...titleInLetters,
    ...vendorInLetters,
  );
  return [...titleInWords, numberAmt];
};

export const searchData = (data, searchText) => {
  const filteredData = filter(
    data,
    (item) => item?.keywords?.indexOf(searchText.toLowerCase().trim()) > -1,
  );

  if (filteredData.length) {
    return filteredData;
  }

  return false;
};
