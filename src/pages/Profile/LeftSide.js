/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import './Profile.css';
import { AiOutlineSave } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../../UI';
import { useForm } from '../../hooks';
import { getLoader } from '../../helpers';
import { authActions } from '../../state/Redux';

const LeftSide = ({ data: { details, uid, displayName } }) => {
  const { loading } = useSelector((state) => getLoader(state));
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

    dispatch(authActions.changeUsername(username, uid, details));
  };

  const actionHandler = shouldChangeUsername ? handleChangeUsername : null;
  const saveBtnText = loading ? '•' : <AiOutlineSave />;

  return (
    <div className="left">
      <div className="heading">
        <h1>Hello {details.displayName}</h1>
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
      </div>
    </div>
  );
};

export default LeftSide;
