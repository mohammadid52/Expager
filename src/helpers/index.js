/* eslint-disable implicit-arrow-linebreak */
import { get, isEmpty } from 'lodash';
import { otherActions } from '../state/Redux';

export const getAuth = (state) => get(state, 'firebase.auth', {});
export const getLocalAuthState = (state) => get(state, 'auth', {});
export const getWalletState = (state) => get(state, 'wallet', {});
export const getDetails = (state) => get(state, 'firestore.data.details', []);
export const getOtherValues = (state) => get(state, 'other', {});
export const getWalletData = (state) => get(state, 'wallet.data', {});

export const getNoDataClass = (wallet, type) =>
  // console.log(wallet);
  otherActions.getDataValue(wallet, type) <= 0;
