import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage > totalPages - 3) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className="px-3 py-2 bg-gray-200 rounded hover:bg-main-purple hover:text-white font-medium"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getPageNumbers().map((number, index) =>
        typeof number === 'number' ? (
          <button
            key={index}
            className={`px-3 py-2 rounded font-medium ${
              number === currentPage ? 'bg-main-purple text-white' : 'bg-gray-200 text-gray-600'
            } hover:bg-main-purple hover:text-white`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ) : (
          <span key={index} className="px-3 py-2 text-gray-600 font-medium">
            {number}
          </span>
        )
      )}
      <button
        className="px-3 py-2 font-medium bg-gray-200 rounded hover:bg-main-purple hover:text-white"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
