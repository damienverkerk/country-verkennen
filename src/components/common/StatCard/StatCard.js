import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const StatCard = ({ title, value, total, description, onAction, actionText }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p className="stat-number">{value}</p>
    {total && <p>van de {total} landen</p>}
    {description && <p>{description}</p>}
    <Button onClick={onAction}>{actionText}</Button>
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
