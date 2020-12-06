import * as types from '../types';
import firebase from '../../../firebase';

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
        createdAt: new Date(),
      },
    });
    dispatch({
      type: types.CREATE_WALLET,
      msg: `account created with balance ₹ ${walletBalanceValue}`,
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
          },
        ],
      },
    });
    dispatch({
      type: types.ADD_EXPENSE_TO_WALLET,
      msg: `Expense Added. Current Balance: ${account.walletBalance}`,
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
          },
        ],
      },
    });
    dispatch({
      type: types.ADD_EARNINGS_TO_WALLET,
      msg: `Earnings Added. Current Balance: ${account.walletBalance}`,
    });
  } catch (error) {
    dispatch({ type: types.ADD_EARNINGS_TO_WALLET_ERR, err: error.message });
  } finally {
    dispatch({ type: types.WALLET_LOADER_OFF });
  }
};

export { createWalletAccount, addExpenseBalance, addEarnings };
