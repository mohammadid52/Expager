import PropTypes from 'prop-types';
import React from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { getOtherValues } from '../../helpers';

const Profile = ({ data }) => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return (
    <section className={`${isSidebarMin ? 'maxified-content' : ''} profile content card`}>
      <LeftSide wallet={data} />
      <RightSide wallet={data} />
    </section>
  );
};

Profile.propTypes = {
  data: PropTypes.shape({
    other: PropTypes.shape({
      isDataLoaded: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Profile;
