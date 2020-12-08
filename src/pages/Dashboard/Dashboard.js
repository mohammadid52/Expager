import './Dashboard.css';
import '../../components/DashboardComponents/DashboardComp.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { getOtherValues, sidebarMinified, getToday } from '../../helpers';
import { DashboardComponents } from '../../components';

const Dashboard = ({ data }) => {
  const { isAccountCreated } = data;
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  const todayDay = getToday('dddd');
  const todayDate = getToday('ll');

  return (
    <section className={`${sidebarMinified(isSidebarMin)} content`}>
      <div className="page-header-dashboard">
        <div className="dot" />
        <div>
          <h1 className="page-title-2">Dashboard</h1>
          <p>
            <span>{todayDay},</span> {todayDate}
          </p>
        </div>
      </div>
      <div className="dashboard-container">
        {!isAccountCreated ? (
          <DashboardComponents.CreateWallet data={data} />
        ) : (
          <div className={`card daily-card ${isSidebarMin ? 'full-size' : ''}`}>
            <DashboardComponents.DailyChangesGraph data={data} />
          </div>
        )}
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
