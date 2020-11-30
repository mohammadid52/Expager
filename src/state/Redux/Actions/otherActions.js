import * as types from '../types';

const switchSidebar = () => (dispatch) => {
  dispatch({ type: types.SIDEBAR_MIN_ON });
};

export { switchSidebar };
