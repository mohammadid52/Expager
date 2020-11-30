import { toast } from 'react-toastify';
import * as types from '../types';

const initialState = {
  loading: false,
};

const toastConfig = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP:
      return toast.success(action.msg, toastConfig);
    case types.SIGNUP_ERR:
      return toast.error(action.err, toastConfig);
    case types.LOGIN:
      return toast.success(action.msg, toastConfig);
    case types.LOGIN_ERR:
      return toast.error(action.err, toastConfig);
    case types.LOGOUT:
      return toast.success(action.msg, toastConfig);
    case types.CHANGE_USERNAME:
      return toast.info(action.msg, toastConfig);
    case types.CHANGE_USERNAME_ERR:
      return toast.error(action.err, toastConfig);

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
