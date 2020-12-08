import React from 'react';
import './Error.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOtherValues, sidebarMinified } from '../../helpers';

const Error = () => {
  const { isSidebarMin } = useSelector((state) => getOtherValues(state));
  return (
    <section className={`error-container content ${sidebarMinified(isSidebarMin)}`}>
      <div>
        {/* Img */}
        <h1 className="page-title">Page Not Found</h1>
        <p>Sorry, we can&apos;t find the page you&apos;re looking for</p>
        <Link to="/">
          <button type="button">Back to Dashboard</button>
        </Link>
      </div>
    </section>
  );
};

export default Error;
