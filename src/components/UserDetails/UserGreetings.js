import PropTypes from 'prop-types';
import React from 'react';

const UserGreetings = ({ details }) => {
  const { displayName } = details;
  return (
    <div className="heading">
      <h1>
        Hello <span>{displayName || 'Human'}</span>
      </h1>
      <p>
        Have a nice day at work{' '}
        <span aria-label="Smile" role="img">
          😊
        </span>
      </p>
    </div>
  );
};

UserGreetings.propTypes = {
  details: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserGreetings;
