import './Dashboard.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { getOtherValues, sidebarMinified } from '../../helpers';
import CreateWallet from './CreateWallet';

const Dashboard = ({ data }) => {
  const { isAccountCreated } = data;

  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  return (
    <section className={`${sidebarMinified(isSidebarMin)} content`}>
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-container">
        <div className="left-side">{!isAccountCreated && <CreateWallet data={data} />}</div>
        {/* <div className="right-side">
          <p className="small-heading">wallet</p>
          <div className="card add-wallet-bal">
          <h4 className="add-bal-title">Add Wallet balance</h4>
        </div>
        </div> */}
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  data: PropTypes.shape({
    isAccountCreated: PropTypes.any.isRequired,
  }).isRequired,
};

export default Dashboard;
