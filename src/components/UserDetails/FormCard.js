/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../UI';
import { useForm } from '../../hooks';
import { getLocalAuthState } from '../../helpers';
import { otherActions } from '../../state/Redux';

const FormCard = ({ userData }) => {
  const { displayNameAuth, details } = userData;
  const { displayName, changesLeft, uid } = details;
  const { loading } = useSelector((state) => getLocalAuthState(state));
  const [error, setError] = useState('');
  const { values, handleInput } = useForm({
    username: displayNameAuth,
  });
  const dispatch = useDispatch();

  const { username } = values;

  const length = {
    min: 8,
    max: 35,
  };

  const usernameLength = username?.length;
  const charactersLeft = length.max - usernameLength;
  const isMinLength = usernameLength >= length.min;
  const shouldChangeUsername = charactersLeft >= 0;

  const inputBorderClass = () => {
    if (error || !shouldChangeUsername) {
      return 'field errorBorder';
    }
    return 'field';
  };

  const handleChangeUsername = () => {
    if (displayName === username) {
      setError('new value must be different from old value.');
      return;
    }
    if (!isMinLength) {
      setError('minimum length: 8');
      return;
    }

    if (changesLeft < 0) {
      setError('Maximum limit reached');
      inputBorderClass();
      return;
    }

    setError('');
    inputBorderClass();
    const dataToSend = {
      username,
      uid,
      details,
    };

    dispatch(otherActions.changeUsername(dataToSend));
  };

  const actionHandler = shouldChangeUsername ? handleChangeUsername : null;
  const saveBtnText = loading ? '•' : <AiOutlineSave />;
  return (
    <div className="form_field_container">
      <div className="form__field">
        <Input
          name="username"
          onChange={handleInput}
          value={username}
          placeholder="Username"
          className={inputBorderClass()}
        />
        <div>
          {error ? (
            <p className="error-text">{error}</p>
          ) : (
            <p>
              {shouldChangeUsername
                ? `${charactersLeft} characters left - `
                : !shouldChangeUsername
                ? 'max limit reached'
                : ''}{' '}
              {shouldChangeUsername && `${changesLeft || 0} changes left`}
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          disabled={!shouldChangeUsername}
          className="save-btn"
          type="button"
          onClick={actionHandler}
        >
          {saveBtnText}
        </button>
      </div>
    </div>
  );
};

FormCard.propTypes = {
  userData: PropTypes.shape({
    details: PropTypes.shape({
      changesLeft: PropTypes.number.isRequired,
      displayName: PropTypes.any.isRequired,
      uid: PropTypes.any.isRequired,
    }).isRequired,
    displayNameAuth: PropTypes.any.isRequired,
  }).isRequired,
};

export default FormCard;
