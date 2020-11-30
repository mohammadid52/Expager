import React from 'react';
import styled from 'styled-components';

const RightSide = () => (
  <Right className="right">
    <p className="small-heading">Your Earnings</p>
    <div className="card earnings" />
  </Right>
);

const Right = styled.div`
  margin-left: 4rem;
  .earnings {
    height: 250px;
  }
`;

export default RightSide;
