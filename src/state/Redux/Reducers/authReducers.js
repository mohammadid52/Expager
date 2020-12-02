import { NotificationManager } from 'react-notifications';
import * as types from '../types';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP:
      NotificationManager.success(action.msg, 'User', 3000);
      return state;
    case types.SIGNUP_ERR:
      NotificationManager.error(action.err, 'User', 3000);
      return state;
    case types.LOGIN:
      NotificationManager.success(action.msg, 'User', 3000);
      return state;
    case types.LOGIN_ERR:
      NotificationManager.error(action.err, 'User', 3000);
      return state;
    case types.LOGOUT:
      NotificationManager.success(action.msg, 'User', 3000);
      return state;

    case types.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
