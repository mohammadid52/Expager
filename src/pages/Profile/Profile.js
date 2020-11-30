import React from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { getOtherValues } from '../../helpers';

const Profile = ({ data }) => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return (
    <section className={`${isSidebarMin ? 'maxified-content' : ''} profile content card`}>
      <LeftSide data={data} />
      <RightSide />
    </section>
  );
};

Profile.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Profile;
