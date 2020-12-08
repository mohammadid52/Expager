import React from 'react';
import { NotificationContainer } from 'react-notifications';
import { AppRoute } from './routes';

function App() {
  return (
    <div className="container">
      <NotificationContainer />
      <AppRoute />
    </div>
  );
}

export default App;
