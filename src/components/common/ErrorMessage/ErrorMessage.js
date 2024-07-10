import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => (
  message ? (
    <div className="error-message" role="alert" aria-live="assertive">
      {message}
    </div>
  ) : null
);

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
