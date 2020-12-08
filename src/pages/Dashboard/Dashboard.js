/* eslint-disable react/prop-types */
import './Dashboard.css';
import '../../components/DashboardComponents/DashboardComp.css';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getOtherValues, sidebarMinified, getToday } from '../../helpers';
import { DashboardComponents, NoData } from '../../components';

const Dashboard = ({ data }) => {
  const { isAccountCreated } = data;
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));

  const todayDay = getToday('dddd');
  const todayDate = getToday('ll');

  const {
    details: { account },
  } = data;

  const { expenseList, earningsList } = account;

  const firstExpOrIncDate = expenseList[0]?.createdAt || earningsList[0]?.createdAt;
  const showGraphData = moment(firstExpOrIncDate.toDate()).format('ll') !== todayDate;

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
            {showGraphData ? (
              <DashboardComponents.DailyChangesGraph data={data} />
            ) : (
              <NoData title="Graph will be unlock after 24 hourse of first transaction" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  data: PropTypes.shape({
    isAccountCreated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Dashboard;
