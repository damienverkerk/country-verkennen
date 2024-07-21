import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './StatCard.css';

const StatCard = ({ title, value, total, description, onAction, actionText }) => (
  <div className="stat-card">
    <h3 className="stat-card-title">{title}</h3>
    <p className="stat-number">{value}</p>
    {total && <p className="stat-total">van de {total} landen</p>}
    {description && <p className="stat-description">{description}</p>}
    <Button onClick={onAction} className="btn stat-card-button">{actionText}</Button>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number,
  description: PropTypes.string,
  onAction: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
};

export default StatCard;