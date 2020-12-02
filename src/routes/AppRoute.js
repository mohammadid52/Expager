/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { has, map, values } from 'lodash';
import {
  Dashboard,
  SignUp,
  Login,
  Profile,
  Expense,
  Earnings,
  History,
  DataWrapper,
} from '../pages';
import { Sidebar, FloatingWallet } from '../components';
import { PrivateRoute } from '.';
import { getAuth, getDetails } from '../helpers';

const AppRoute = () => {
  const auth = useSelector((state) => getAuth(state));

  const [$details, setDetails] = useState({});

  const { uid, displayName } = auth;

  const detailsCollectionRef = `users/${uid}/details`;

  useFirestoreConnect({
    collection: detailsCollectionRef,
    storeAs: 'details',
  });

  const detailsRawData = useSelector((state) => getDetails(state));

  async function setDataToState() {
    await map(values(detailsRawData), (d) => {
      setDetails(d);
    });
  }

  useEffect(() => {
    setDataToState();
  }, [detailsRawData, $details]);

  const isAccountCreated = has($details, 'account');

  const data = {
    details: $details,
    uid,
    displayName,
    isAccountCreated,
  };

  const appRoutes = [
    {
      Route: PrivateRoute,
      path: '/',
      exact: true,
      Component: Dashboard,
    },
    {
      Route: PrivateRoute,
      path: '/dashboard',
      Component: Dashboard,
    },
    {
      Route: PrivateRoute,
      path: '/earnings',
      Component: Earnings,
    },
    {
      Route: PrivateRoute,
      path: '/expenses',
      Component: Expense,
    },
    {
      Route: PrivateRoute,
      path: '/profile',
      Component: Profile,
    },
    {
      Route: PrivateRoute,
      path: '/history',
      Component: History,
    },
    {
      Route: PrivateRoute,
      path: '/login',
      Component: Login,
      isPublic: true,
    },
    {
      Route: PrivateRoute,
      path: '/signup',
      Component: SignUp,
      isPublic: true,
    },
  ];

  return (
    <Router>
      <DataWrapper data={$details}>
        {uid && <Sidebar />}
        {uid && isAccountCreated && <FloatingWallet data={data} />}
        <Switch>
          {map(appRoutes, (Route) => (
            <Route.Route
              path={Route.path}
              exact={has(Route, 'exact')}
              isPublic={has(Route, 'isPublic')}
            >
              <Route.Component data={data} />
            </Route.Route>
          ))}
        </Switch>
      </DataWrapper>
    </Router>
  );
};
export default AppRoute;
