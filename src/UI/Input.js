import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = ({ name, type, value, onChange, placeholder, ...rest }) => (
  <InputField
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...rest}
  />
);

const InputField = styled.input`
  height: 50px;
  padding: 0 10px;
  font-size: 17px;
  color: hsl(209, 61%, 16%);
  transition: all 0.3s linear;
  border: 1px solid #ebebeb;
  border-radius: 6px;

  :focus {
    outline: none;
    border: 1px solid #316cd3;
  }

  ::placeholder {
    color: #000;
    opacity: 0.1;
  }
`;

Input.defaultProps = {
  type: 'text',
  placeholder: null,
  borderColor: '#316CD3',
};
Input.propTypes = {
  borderColor: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
