import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts.css';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import App from './App';
import { store } from './state';
import { rrfConfig } from './config';
import firebase from './firebase';
import { AuthWrapper } from './pages';
import 'react-notifications/lib/notifications.css';
import './components/UserDetails/UserDetails.css';
import 'antd/dist/antd.css';

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
