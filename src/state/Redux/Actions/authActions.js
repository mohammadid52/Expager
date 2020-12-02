import firebase from '../../../firebase';
import * as types from '../types';

const userRef = firebase.firestore().collection('users');

const signUp = (creds) => async (dispatch) => {
  dispatch({ type: types.START_LOADING });
  try {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    createdUser.user.updateProfile({
      displayName: creds.username,
    });
    const { uid } = createdUser.user;
    const details = await userRef.doc(uid).collection('details').add({
      changesLeft: 10,
    });
    details.update({
      displayName: creds.username,
      id: details.id,
    });
    dispatch({ type: types.SIGNUP, msg: 'Sign up successfully' });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.SIGNUP_ERR, err: error.message });
  } finally {
    dispatch({ type: types.STOP_LOADING });
  }
};
const login = (creds) => async (dispatch) => {
  dispatch({ type: types.START_LOADING });
  try {
    await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
    dispatch({ type: types.LOGIN, msg: 'Login successfully' });
  } catch (error) {
    console.log(error);

    dispatch({ type: types.LOGIN_ERR, err: error.message });
  } finally {
    dispatch({ type: types.STOP_LOADING });
  }
};

const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING });
    await firebase.auth().signOut();
    dispatch({ type: types.LOGOUT, msg: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: types.STOP_LOADING });
  }
};

const startLoader = () => (dispatch) => {
  dispatch({ type: types.START_LOADING });
};
const stopLoader = () => (dispatch) => {
  dispatch({ type: types.STOP_LOADING });
};

export { login, signUp, logOut, startLoader, stopLoader };
