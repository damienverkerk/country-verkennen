import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ title, icon, children, className }) => (
  <div className={`card ${className}`}>
    <div className="card-header">
      <i className={`fas ${icon} card-icon`}></i>
      <h3 className="card-title">{title}</h3>
    </div>
    <div className="card-content">
      {children}
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  icon: '',
  className: '',
};

export default Card;