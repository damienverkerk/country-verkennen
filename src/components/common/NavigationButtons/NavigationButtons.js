import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './NavigationButtons.css';

const NavigationButtons = ({ onPrevious, onNext, previousLabel, nextLabel }) => (
  <footer className="navigation-buttons">
    <Button onClick={onPrevious} className="btn navigation-button">{previousLabel}</Button>
    <Button onClick={onNext} className="btn navigation-button">{nextLabel}</Button>
  </footer>
);

NavigationButtons.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  previousLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
};

export default NavigationButtons;