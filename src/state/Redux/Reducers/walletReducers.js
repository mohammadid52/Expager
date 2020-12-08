import { NotificationManager } from 'react-notifications';
import * as types from '../types';

const initialState = {
  loading: false,
  searchText: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.WALLET_LOADER_ON:
      return {
        ...state,
        loading: true,
      };
    case types.WALLET_LOADER_OFF:
      return {
        ...state,
        loading: false,
      };
    case types.SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };

    case types.CREATE_WALLET:
      return state;
    case types.CREATE_WALLET_ERR:
      NotificationManager.error(action.err, 'Wallet Error', 10000);
      return state;
    case types.ADD_EXPENSE_TO_WALLET:
      return state;
    case types.ADD_EXPENSE_TO_WALLET_ERR:
      NotificationManager.error(action.err, 'Wallet Error', 10000);
      return state;
    case types.ADD_EARNINGS_TO_WALLET:
      return state;
    case types.ADD_EARNINGS_TO_WALLET_ERR:
      NotificationManager.error(action.err, 'Wallet Error', 10000);
      return state;

    default:
      return state;
  }
};
