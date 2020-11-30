import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducers';
import otherReducer from './otherReducer';
import walletReducer from './walletReducers';

export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  other: otherReducer,
  wallet: walletReducer,
});
