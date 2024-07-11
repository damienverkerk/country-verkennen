import React from 'react';
import PropTypes from 'prop-types';

const KeyValuePair = ({ term, description }) => (
  <>
    <dt>{term}:</dt>
    <dd>{description}</dd>
  </>
);

KeyValuePair.propTypes = {
  term: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default KeyValuePair;
