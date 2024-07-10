import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  total, 
  onViewMore, 
  icon, 
  description,
  trend
}) => {
  const percentage = total ? Math.round((value / total) * 100) : null;

  return (
    <Card className="stat-card">
      <div className="stat-card-content">
        {icon && <span className="stat-card-icon" aria-hidden="true">{icon}</span>}
        <h3 className="stat-card-title">{title}</h3>
        <div className="stat-card-value-container">
          <span className="stat-card-value">{value.toLocaleString()}</span>
          {total && (
            <span className="stat-card-total">
              of {total.toLocaleString()} ({percentage}%)
            </span>
          )}
        </div>
        {description && (
          <p className="stat-card-description">{description}</p>
        )}
        {trend && (
          <div className={`stat-card-trend ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : ''}`}>
            <span className="stat-card-trend-icon" aria-hidden="true">
              {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
            </span>
            <span className="stat-card-trend-value">
              {Math.abs(trend)}% {trend > 0 ? 'increase' : trend < 0 ? 'decrease' : 'no change'}
            </span>
          </div>
        )}
      </div>
      {onViewMore && (
        <Button 
          onClick={onViewMore} 
          className="stat-card-button"
          aria-label={`View more details about ${title}`}
        >
          View More
        </Button>
      )}
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number,
  onViewMore: PropTypes.func,
  icon: PropTypes.node,
  description: PropTypes.string,
  trend: PropTypes.number
};

export default StatCard;
