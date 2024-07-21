import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({ size = 'medium', message = 'Loading...' }) => (
  <div className={`loading loading-${size}`} role="status" aria-live="polite">
    <div className="loading-spinner" aria-hidden="true"></div>
    {message && <p className="loading-message">{message}</p>}
  </div>
);

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  message: PropTypes.string
};

export default Loading;