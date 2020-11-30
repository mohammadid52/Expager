import React from 'react';
import { ToastContainer } from 'react-toastify';
import { AppRoute } from './routes';

function App() {
  return (
    <div className="container">
      <ToastContainer />
      <AppRoute />
    </div>
  );
}

export default App;
