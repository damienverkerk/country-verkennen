import React from 'react';
import PropTypes from 'prop-types';
import './KeyValuePair.css';

const KeyValuePair = ({ term, description }) => (
  <div className="key-value-pair">
    <dt>{term}:</dt>
    <dd>{description}</dd>
  </div>
);

KeyValuePair.propTypes = {
  term: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default KeyValuePair;