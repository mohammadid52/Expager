import React from 'react';
import { ToastContainer } from 'react-toastify';
import { NotificationContainer } from 'react-notifications';
import { AppRoute } from './routes';

function App() {
  return (
    <div className="container">
      <ToastContainer />
      <NotificationContainer />
      <AppRoute />
    </div>
  );
}

export default App;
