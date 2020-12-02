import * as types from '../types';
import firebase from '../../../firebase';

const switchSidebar = () => (dispatch) => {
  dispatch({ type: types.SIDEBAR_MIN_ON });
};
const userRef = firebase.firestore().collection('users');

const getDataValue = (wallet, isExpense = true) => {
  switch (isExpense) {
    case true:
      return wallet.account.totalExpenses;
    case false:
      return wallet.account.totalEarnings;

    default:
      return wallet.account.totalEarnings;
  }
};
const changeUsername = (data) => async (dispatch) => {
  const { username, uid, details } = data;
  dispatch({ type: types.START_LOADING });

  try {
    const { currentUser } = firebase.auth();
    await currentUser.updateProfile({
      displayName: username,
    });
    userRef
      .doc(uid)
      .collection('details')
      .doc(details.id)
      .update({
        ...details,
        displayName: username,
        changesLeft: details.changesLeft - 1,
      });

    dispatch({ type: types.CHANGE_USERNAME, msg: 'Username changed successfully' });
  } catch (error) {
    dispatch({ type: types.CHANGE_USERNAME_ERR, err: error.message });
  } finally {
    dispatch({ type: types.STOP_LOADING });
  }
};
export { switchSidebar, getDataValue, changeUsername };
