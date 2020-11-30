import { get } from 'lodash';

export const getAuth = (state) => get(state, 'firebase.auth', {});
export const getLoader = (state) => get(state, 'auth', false);
export const getDetails = (state) => get(state, 'firestore.data.details', []);
export const getOtherValues = (state) => get(state, 'other', {});
