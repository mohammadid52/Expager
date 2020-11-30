import { toast } from 'react-toastify';
import * as types from '../types';

const initialState = {};
const toastConfig = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_BALANCE:
      toast.success(action.msg, toastConfig);
      return state;
    case types.ADD_BALANCE_ERR:
      toast.error(action.err, toastConfig);
      return state;

    default:
      return state;
  }
};
