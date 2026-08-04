import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = 'Search by country or capital...' }) => {
  return (
    <div className="position-relative w-100">
      <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border border-brand-primary border-opacity-25 bg-white">
        <span className="input-group-text bg-transparent border-0 pe-0 text-brand-primary ps-4">
          <FaSearch size={18} />
        </span>
        <input
          type="text"
          className="form-control border-0 bg-transparent py-3 ps-3 shadow-none text-brand-dark font-medium"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search destinations"
        />
        {searchTerm && (
          <button
            type="button"
            className="btn btn-link text-muted border-0 pe-4"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
