/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { has, keys, map, values } from 'lodash';
import { Dashboard, SignUp, Login, Profile, Expense, Earnings, History } from '../pages';
import { Sidebar, FloatingWallet } from '../components';
import { PrivateRoute } from '.';
import { getAuth, getDetails } from '../helpers';

const AppRoute = () => {
  const auth = useSelector((state) => getAuth(state));
  const [$details, setDetails] = useState({});
  const { uid, displayName } = auth;
  const detailsCollectionRef = `users/${uid}/details`;

  const isDataLoaded = loadData();

  useFirestoreConnect({
    collection: detailsCollectionRef,
    storeAs: 'details',
  });
  const detailsRawData = useSelector((state) => getDetails(state));

  useEffect(() => {
    getData();
  }, [detailsRawData]);

  async function getData() {
    await map(values(detailsRawData), (detail) => setDetails(detail));
  }
  const isAccountCreated = has($details, 'account');

  function loadData() {
    if (keys($details).length) {
      return true;
    }
  }

  const data = {
    uid,
    displayName,
    isAccountCreated,
    isDataLoaded,
    details: $details,
  };

  return (
    <Router>
      {uid && <Sidebar />}
      {uid && isAccountCreated && <FloatingWallet data={data} />}
      <Switch>
        <PrivateRoute path="/" exact>
          <Dashboard data={data} />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard data={data} />
        </PrivateRoute>
        <PrivateRoute path="/history">
          <History text="History" />
        </PrivateRoute>
        <PrivateRoute path="/expenses">
          <Expense />
        </PrivateRoute>
        <PrivateRoute path="/earnings">
          <Earnings />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile data={data} />
        </PrivateRoute>
        <PrivateRoute isPublic path="/signup">
          <SignUp />
        </PrivateRoute>
        <PrivateRoute isPublic path="/login">
          <Login />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};
export default AppRoute;
