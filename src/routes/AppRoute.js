import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { has, map, values } from 'lodash';
import { Dashboard, SignUp, Login, Profile, Action, History, DataWrapper } from '../pages';
import { Sidebar, UserDetails } from '../components';
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

  const setDataToState = useCallback(async () => {
    await map(values(detailsRawData), (d) => {
      setDetails(d);
    });
  }, [detailsRawData]);

  useEffect(() => {
    setDataToState();
  }, [detailsRawData, $details, setDataToState]);

  const isAccountCreated = has($details, 'account.walletBalance');

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
      Component: Action,
    },
    {
      Route: PrivateRoute,
      path: '/expenses',
      Component: Action,
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
      <DataWrapper data={data}>
        {uid && <Sidebar />}
        {uid && <UserDetails.FloatingImage data={data} profileImgId={$details.profileImgId} />}
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
