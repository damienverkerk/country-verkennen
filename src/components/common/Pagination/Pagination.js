import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <Button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </Button>
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? 'active' : ''}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </Button>
      ))}
      <Button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
