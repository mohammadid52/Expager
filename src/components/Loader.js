import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/animation/loadingAnimation.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loader = () => (
  <Wrapper>
    <Lottie options={defaultOptions} height={500} width={700} />
  </Wrapper>
);

const Wrapper = styled.section`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #fff;
`;

export default Loader;
