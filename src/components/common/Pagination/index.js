import React from 'react';
import Button from '../Button';
import '../../../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPage = totalPages;

    let startPage, endPage;
    if (maxPage <= 3) {
        startPage = 1;
        endPage = maxPage;
    } else {
        if (currentPage <= 2) {
            startPage = 1;
            endPage = 3;
        } else if (currentPage + 1 >= maxPage) {
            startPage = maxPage - 2;
            endPage = maxPage;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-controls">
            <Button
                id="custom-button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            >
                Vorige
            </Button>
            {pageNumbers.map(number => (
                <Button
                    key={number}
                    id="custom-button"
                    disabled={number === currentPage}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </Button>
            ))}
            <Button
                id="custom-button"
                disabled={currentPage === maxPage}
                onClick={() => onPageChange(Math.min(currentPage + 1, maxPage))}
            >
                Volgende
            </Button>
        </div>
    );
};

export default Pagination;
