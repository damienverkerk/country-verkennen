import React from 'react';
import PropTypes from 'prop-types';
import './SectionHeader.css';

const SectionHeader = ({ id, children, className = '' }) => (
  <h2 id={id} className={`section-header ${className}`}>
    {children}
  </h2>
);

SectionHeader.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default SectionHeader;
