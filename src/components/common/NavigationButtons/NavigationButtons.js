import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const NavigationButtons = ({ onPrevious, onNext, previousLabel, nextLabel }) => (
  <footer className="navigation-buttons">
    <Button onClick={onPrevious}>{previousLabel}</Button>
    <Button onClick={onNext}>{nextLabel}</Button>
  </footer>
);

NavigationButtons.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  previousLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
};

export default NavigationButtons;
