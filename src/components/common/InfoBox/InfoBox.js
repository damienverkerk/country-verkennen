import React from 'react';
import PropTypes from 'prop-types';
import './InfoBox.css';

const InfoBox = ({ children }) => (
  <section className="info-box" aria-label="Information">
    <p>{children}</p>
  </section>
);

InfoBox.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoBox;