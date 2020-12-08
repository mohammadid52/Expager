import PropTypes from 'prop-types';
import React from 'react';
import { filter } from 'lodash';
import { useSelector } from 'react-redux';
import avatarList from '../../assets/svg/avatarList';
import { getLocalAuthState } from '../../helpers';

const FloatingImage = ({ profileImgId }) => {
  const selectedImage = filter(avatarList, { id: profileImgId });
  const { loading } = useSelector((state) => getLocalAuthState(state));
  return (
    <div className="floating-img-container">
      <img
        alt="user profile"
        src={selectedImage[0].img}
        className={`floating-img ${loading ? 'loading-img' : ''}`}
      />
    </div>
  );
};

FloatingImage.defaultProps = {
  profileImgId: 1,
};

FloatingImage.propTypes = {
  profileImgId: PropTypes.number,
};

export default FloatingImage;
