import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const ActionSection = ({ title, actionText, onAction }) => (
  <section className="dashboard-actions">
    <h2>{title}</h2>
    <Button onClick={onAction} className="primary-button">
      {actionText}
    </Button>
  </section>
);

ActionSection.propTypes = {
  title: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ActionSection;
