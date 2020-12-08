import React from 'react';
import PropTypes from 'prop-types';
import './Profile.css';

import { NoData, Activity, UserDetails } from '../../components';
import { isDataEmpty } from '../../helpers';

const LeftSide = ({ wallet }) => {
  const { details } = wallet;

  const { account } = details;

  return (
    <div className="left-profile">
      <UserDetails.UserGreetings details={wallet} />

      <p className="small-heading">Activity</p>
      <div className="card activity">
        {isDataEmpty(account, true) && isDataEmpty(account, false) ? (
          <NoData />
        ) : (
          <>
            <Activity.WeeklyChange account={account} />
            <Activity.MonthlyChange account={account} />
          </>
        )}
      </div>
      <p className="small-heading">User Details</p>
      <div className="form">
        <div className="card form_card">
          <UserDetails.FormCard
            userData={{
              displayNameAuth: wallet.displayName,
              details,
            }}
          />
          <UserDetails.ProfilePicker data={wallet} />
        </div>
      </div>
    </div>
  );
};

LeftSide.propTypes = {
  details: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    details: PropTypes.object.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default LeftSide;
