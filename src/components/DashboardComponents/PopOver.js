import PropTypes from 'prop-types';
import { Popover } from 'antd';

import React from 'react';

const PopOver = ({ content, trigger = 'hover', placement, children }) => (
  <Popover content={content} trigger={trigger} placement={placement}>
    {children}
  </Popover>
);

PopOver.propTypes = {
  children: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  trigger: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired,
};

export default PopOver;
