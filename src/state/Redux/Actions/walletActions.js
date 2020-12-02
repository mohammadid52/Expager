import * as types from '../types';
import firebase from '../../../firebase';

const userRef = firebase.firestore().collection('users');

const getDetailsCollection = (uid, id) => userRef.doc(uid).collection('details').doc(id);

const createWalletAccount = (data) => async (dispatch) => {
  dispatch({ type: types.START_LOADING });
  try {
    const detailsRef = getDetailsCollection(data.uid, data.detailsData.id);

    await detailsRef.update({
      ...data.detailsData,
      account: {
        currency: 'INR',
        walletBalance: Number(data.walletBalanceValue),
        totalExpenses: 0,
        totalEarnings: 0,
        expenseList: [],
        earningsList: [],
      },
    });
    dispatch({
      type: types.CREATE_WALLET,
      msg: `account created with balance ₹ ${data.walletBalanceValue}`,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_WALLET_ERR, err: error.message });
  } finally {
    dispatch({ type: types.START_LOADING });
  }
};

const addExpenseBalance = (data) => async (dispatch) => {
  dispatch({ type: types.WALLET_LOADER_ON });

  try {
    const { detailsData, expenseData } = data;
    const { expenseAmt } = expenseData;
    const { account } = detailsData;

    const numberAmt = Number(expenseAmt);

    const detailsRef = getDetailsCollection(data.uid, detailsData.id);
    await detailsRef.update({
      ...detailsData,
      account: {
        ...account,
        walletBalance: account.walletBalance - numberAmt,
        totalExpenses: account.totalExpenses + numberAmt,
        expenseList: [
          ...account.expenseList,
          {
            ...expenseData,
            expenseAmt: numberAmt,
          },
        ],
      },
    });
    dispatch({ type: types.ADD_EXPENSE_TO_WALLET, msg: 'Expense Added' });
  } catch (error) {
    dispatch({ type: types.ADD_EXPENSE_TO_WALLET_ERR, err: error.message });
  } finally {
    dispatch({ type: types.WALLET_LOADER_OFF });
  }
};

const setWalletDetails = (data) => async (dispatch) => {
  dispatch({ type: types.SET_DETAILS, data });
};

const handleIsDataLoaded = (data) => async (dispatch) => {
  console.log(data);
  if (Object.keys(data).length) {
    dispatch({ type: types.SET_IS_WALLET_LOADED_TRUE });
  } else {
    dispatch({ type: types.SET_IS_WALLET_LOADED_FALSE });
  }
};

export { createWalletAccount, addExpenseBalance, setWalletDetails, handleIsDataLoaded };
