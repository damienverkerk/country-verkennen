import React from 'react';
import PropTypes from 'prop-types';
import './PageLayout.css';

const PageLayout = ({ title, children, sidebar }) => (
  <div className="page-layout">
    <header className="page-header">
      <h1>{title}</h1>
    </header>
    <div className="page-content">
      <main className="page-main">{children}</main>
      {sidebar && <aside className="page-sidebar">{sidebar}</aside>}
    </div>
  </div>
);

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node
};

export default PageLayout;
