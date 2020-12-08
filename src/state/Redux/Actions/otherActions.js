/* eslint-disable newline-per-chained-call */
/* eslint-disable implicit-arrow-linebreak */
import * as types from '../types';
import firebase from '../../../firebase';

const switchSidebar = () => (dispatch) => {
  dispatch({ type: types.SWITCH_SIDEBAR });
};

const getDetailsRef = (uid, id) =>
  firebase.firestore().collection('users').doc(uid).collection('details').doc(id);

const changeUsername = (data) => async (dispatch) => {
  const { username, uid, details } = data;
  dispatch({ type: types.START_LOADING });

  try {
    const { currentUser } = firebase.auth();
    await currentUser.updateProfile({
      displayName: username,
    });
    const detailsRef = getDetailsRef(uid, details.id);
    detailsRef.update({
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

const changeProfile = (data, profileImgId) => {
  const { details, uid } = data;
  const detailsRef = getDetailsRef(uid, details.id);
  detailsRef.update({
    ...details,
    profileImgId,
  });
};

const sortBy = (value) => (dispatch) => {
  dispatch({ type: types.SORT_BY, value });
};

export { changeUsername, changeProfile, switchSidebar, sortBy };
