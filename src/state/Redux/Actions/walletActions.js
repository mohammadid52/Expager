import * as types from '../types';
import firebase from '../../../firebase';
import { combinations } from '../../../helpers';

const userRef = firebase.firestore().collection('users');

const getDetailsCollection = (uid, id) => userRef.doc(uid).collection('details').doc(id);

const createWalletAccount = (data) => async (dispatch) => {
  dispatch({ type: types.WALLET_LOADER_ON });
  const { uid, details, walletBalanceValue } = data;
  const { account } = details;

  try {
    const detailsRef = getDetailsCollection(uid, details.id);

    await detailsRef.update({
      ...details,
      account: {
        ...account,
        currency: 'INR',
        walletBalance: Number(walletBalanceValue),
        totalExpenses: 0,
        totalEarnings: 0,
        expenseList: [],
        earningsList: [],
      },
    });
    dispatch({
      type: types.CREATE_WALLET,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_WALLET_ERR, err: error.message });
  } finally {
    dispatch({ type: types.WALLET_LOADER_OFF });
  }
};

const addExpenseBalance = (data) => async (dispatch) => {
  dispatch({ type: types.WALLET_LOADER_ON });

  try {
    const { details, values, uid } = data;
    const { account } = details;

    const numberAmt = Number(values.expenseAmt);

    const detailsRef = getDetailsCollection(uid, details.id);
    const keywordsCombinations = combinations(values, values.expenseAmt);
    await detailsRef.update({
      ...details,
      account: {
        ...account,
        walletBalance: account.walletBalance - numberAmt,
        totalExpenses: account.totalExpenses + numberAmt,
        expenseList: [
          ...account.expenseList,
          {
            title: values.title,
            vendor: values.vendor,
            createdAt: new Date(),
            expenseAmt: numberAmt,
            keywords: keywordsCombinations,
          },
        ],
      },
    });
    dispatch({
      type: types.ADD_EXPENSE_TO_WALLET,
    });
  } catch (error) {
    dispatch({ type: types.ADD_EXPENSE_TO_WALLET_ERR, err: error.message });
  } finally {
    dispatch({ type: types.WALLET_LOADER_OFF });
  }
};

const addEarnings = (data) => async (dispatch) => {
  dispatch({ type: types.WALLET_LOADER_ON });

  try {
    const { details, values } = data;

    const { account } = details;

    const numberAmt = Number(values.earningsAmt);

    const detailsRef = getDetailsCollection(data.uid, details.id);
    const keywordsCombinations = combinations(values, values.earningsAmt);

    await detailsRef.update({
      ...details,
      account: {
        ...account,
        walletBalance: account.walletBalance + numberAmt,
        totalEarnings: account.totalEarnings + numberAmt,
        earningsList: [
          ...account.earningsList,
          {
            title: values.title,
            vendor: values.vendor,
            createdAt: new Date(),
            earningsAmt: numberAmt,
            keywords: keywordsCombinations,
          },
        ],
      },
    });
    dispatch({
      type: types.ADD_EARNINGS_TO_WALLET,
    });
  } catch (error) {
    dispatch({ type: types.ADD_EARNINGS_TO_WALLET_ERR, err: error.message });
  } finally {
    dispatch({ type: types.WALLET_LOADER_OFF });
  }
};

const handleSearchText = (searchText) => (dispatch) => {
  dispatch({ type: types.SEARCH_TEXT, searchText });
};

export { createWalletAccount, addExpenseBalance, addEarnings, handleSearchText };
