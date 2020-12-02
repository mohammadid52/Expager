/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Profile.css';
import { AiOutlineSave } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../../UI';
import { useForm } from '../../hooks';
import { getLocalAuthState } from '../../helpers';
import { otherActions } from '../../state/Redux';

const LeftSide = ({ wallet }) => {
  const { uid, displayName, details } = wallet;

  const { loading } = useSelector((state) => getLocalAuthState(state));
  const [error, setError] = useState('');
  const { values, handleInput } = useForm({
    username: displayName,
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

    if (details.changesLeft < 0) {
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
    <div className="left-profile">
      <div className="heading">
        <h1>Hello {details.displayName || 'Human'}</h1>
        <p>Have a nice day at work 😊</p>
      </div>
      <div className="form">
        <p className="small-heading">User Details</p>
        <div className="card form_card">
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
                    {shouldChangeUsername && `${details.changesLeft || 0} changes left`}
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
        </div>
        <p className="small-heading">Other</p>
        <div className="card dummy" />
      </div>
    </div>
  );
};

LeftSide.propTypes = {
  wallet: PropTypes.shape({
    details: PropTypes.shape({
      changesLeft: PropTypes.number.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    displayName: PropTypes.any.isRequired,
    uid: PropTypes.any.isRequired,
  }).isRequired,
};

export default LeftSide;
