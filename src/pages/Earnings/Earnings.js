import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getOtherValues } from '../../helpers';
import './Earnings.css';

const Dashboard = () => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return <Wrapper className={`${isSidebarMin ? 'maxified-content' : ''} content`} />;
};
const Wrapper = styled.section``;

export default Dashboard;
