import React from 'react';
import PropTypes from 'prop-types';
import './EmptyState.css';

const EmptyState = ({ message, icon }) => (
  <div className="empty-state" role="status">
    {icon && <span className="empty-state-icon" aria-hidden="true">{icon}</span>}
    <p className="empty-state-message">{message}</p>
  </div>
);

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.node
};

export default EmptyState;