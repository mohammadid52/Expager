import PropTypes from 'prop-types';
import React from 'react';
import { filter } from 'lodash';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import avatarList from '../../assets/svg/avatarList';
import { getLocalAuthState, createdAt } from '../../helpers';
import { DashboardComponents } from '..';

const FloatingImage = ({ data }) => {
  const { details, isAccountCreated } = data;
  const { profileImgId, account } = details;
  const { walletBalance, totalExpenses, totalEarnings } = account;
  const selectedImage = filter(avatarList, { id: profileImgId });
  const { loading } = useSelector((state) => getLocalAuthState(state));

  const contentIfAccountCreated = (
    <div className="floating-card-details">
      <p className="floating-card-wallet">
        Wallet Balance: <span>{walletBalance}</span>
      </p>
      <p className="floating-card-earnings">
        Total Earnings: <span>{totalEarnings}</span>
      </p>
      <p className="floating-card-expenses">
        Total Expenses: <span>{totalExpenses}</span>
      </p>
      <p className="floating-card-createdon">
        joined us on <span>{createdAt(account.createdAt)}</span>
      </p>
    </div>
  );

  const contentifAccountNotCreated = (
    <div>
      <p className="light-text">It looks you don&apos;t have any account created yet</p>
      <Link to="/">
        <button type="button">Create Account</button>
      </Link>
    </div>
  );

  return (
    <DashboardComponents.PopOver
      content={isAccountCreated ? contentIfAccountCreated : contentifAccountNotCreated}
      trigger="click"
      placement="bottomRight"
    >
      <div className="floating-img-container">
        <img
          alt={profileImgId}
          src={selectedImage[0]?.img || avatarList[3].img}
          className={`floating-img ${loading ? 'loading-img' : ''}`}
        />
      </div>
    </DashboardComponents.PopOver>
  );
};

FloatingImage.defaultProps = {
  profileImgId: 1,
  data: {},
};

FloatingImage.propTypes = {
  data: PropTypes.shape({
    details: PropTypes.shape({
      account: PropTypes.shape({
        createdAt: PropTypes.any,
        totalEarnings: PropTypes.any,
        totalExpenses: PropTypes.any,
        walletBalance: PropTypes.any,
      }),
      profileImgId: PropTypes.any,
    }),
    isAccountCreated: PropTypes.any,
  }),
  profileImgId: PropTypes.number,
};

export default FloatingImage;
