import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getOtherValues } from '../../helpers';
import { useForm } from '../../hooks';
import { Input } from '../../UI';
import './Expense.css';

const Expense = () => {
  //   const { values, handleInput, resetField } = useForm({
  //     number: 1,
  //   });
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return <Wrapper className={`${isSidebarMin ? 'maxified-content' : ''} content`} />;
};
const Wrapper = styled.section``;

export default Expense;
