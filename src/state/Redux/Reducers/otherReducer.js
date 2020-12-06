import { NotificationManager } from 'react-notifications';
import * as types from '../types';

const initialState = {
  isSidebarMin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_SIDEBAR:
      return {
        ...state,
        isSidebarMin: !state.isSidebarMin,
      };
    case types.CHANGE_USERNAME:
      NotificationManager.success(action.msg, 'Profile', 3000);
      return state;

    case types.CHANGE_USERNAME_ERR:
      NotificationManager.success(action.msg, 'Profile', 3000);
      return state;
    default:
      return state;
  }
};
