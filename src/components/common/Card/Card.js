import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ title, icon, children, className, onClick }) => (
  <article className={`card ${className}`} onClick={onClick} role="button" tabIndex="0">
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
  onClick: PropTypes.func, 
};

Card.defaultProps = {
  icon: '',
  className: '',
  onClick: () => {},  
};

export default Card;
