import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ title, icon, children, className }) => (
  <article className={`card ${className}`}>
    <header className="card-header">
      {icon && <i className={`fas ${icon} card-icon`} aria-hidden="true"></i>}
      <h3 className="card-title">{title}</h3>
    </header>
    <div className="card-content">
      {children}
    </div>
  </article>
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
