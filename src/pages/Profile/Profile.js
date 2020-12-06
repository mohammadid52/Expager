import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { getOtherValues, sidebarMinified } from '../../helpers';
import './Profile.css';

const Profile = ({ data }) => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return (
    <section className={`${sidebarMinified(isSidebarMin)} profile content`}>
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
