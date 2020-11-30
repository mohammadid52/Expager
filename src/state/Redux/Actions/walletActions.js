import * as types from '../types';
import firebase from '../../../firebase';

const userRef = firebase.firestore().collection('users');

const createWalletAccount = (data) => async (dispatch) => {
  dispatch({ type: types.START_LOADING });
  try {
    await userRef
      .doc(data.uid)
      .collection('details')
      .doc(data.detailsData.id)
      .update({
        ...data.detailsData,
        account: {
          currency: 'INR',
          walletBalance: data.walletBalanceValue,
          totalExpenses: 0,
          totalEarnings: 0,
        },
      });
    dispatch({
      type: types.ADD_BALANCE,
      msg: `account created with balance ₹ ${data.walletBalanceValue}`,
    });
  } catch (error) {
    dispatch({ type: types.ADD_BALANCE_ERR, err: error.message });
  } finally {
    dispatch({ type: types.START_LOADING });
  }
};

export { createWalletAccount };
