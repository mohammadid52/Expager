import * as types from '../types';

const initialState = {
  isSidebarMin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIDEBAR_MIN_ON:
      return {
        ...state,
        isSidebarMin: !state.isSidebarMin,
      };

    default:
      return state;
  }
};
