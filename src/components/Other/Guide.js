import React from 'react';

const Guide = ({ text1, text2, className }) => (
  <div className={`history-guide ${className}`}>
    <div className="guide-expense">
      <div />
      <p>{text1}</p>
    </div>
    <div className="guide-earnings">
      <div />
      <p>{text2}</p>
    </div>
  </div>
);

export default Guide;
