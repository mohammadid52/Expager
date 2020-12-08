import PropTypes from 'prop-types';
import { map, debounce } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvatarList from '../../assets/svg/avatarList';
import { otherActions, authActions } from '../../state/Redux';
import { getOtherValues } from '../../helpers';

const ProfilePicker = ({ data }) => {
  const {
    details: { profileImgId },
  } = data;
  const [selectedId, setSelectedId] = useState(profileImgId);

  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  const dispatch = useDispatch();
  const update = debounce((profileId) => {
    otherActions.changeProfile(data, profileId);
    dispatch(authActions.stopLoader());
  }, 3000);

  const selectImage = (id) => {
    setSelectedId(id);
    dispatch(authActions.startLoader());
    update(id);
  };

  const isSelectedImage = (id) => (selectedId === id ? 'selected-image' : '');

  return (
    <div className="profile-picker">
      <div className="profile-picker-container">
        {map(AvatarList, ({ img, id }) => (
          <button type="button" onClick={() => selectImage(id)}>
            <img
              src={img}
              alt="User"
              className={`${isSelectedImage(id)} ${!isSidebarMin ? 'small-img' : ''}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

ProfilePicker.defaultProps = {
  data: {},
};

ProfilePicker.propTypes = {
  data: PropTypes.any,
};

export default ProfilePicker;
