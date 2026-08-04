import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found-page min-vh-100 bg-brand-dark text-white d-flex align-items-center justify-content-center py-5">
      <div className="container text-center py-5">
        <div className="glass-dark-card p-5 max-w-lg mx-auto shadow-2xl" style={{ maxWidth: '600px' }}>
          <div className="bg-brand-accent text-brand-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
            <FaCompass size={40} className="text-brand-secondary" />
          </div>

          <h1 className="display-1 font-serif fw-bold text-brand-accent mb-2">404</h1>
          <h2 className="h3 font-serif fw-bold text-white mb-3">Off The Beaten Path</h2>
          <p className="text-white-50 mb-4 lead fs-6">
            The page or destination route you are looking for has been moved, renamed, or does not exist in our global catalog.
          </p>

          <div className="d-flex flex-sm-row flex-column justify-content-center gap-3">
            <Link to="/" className="btn btn-brand-accent px-4 py-3 d-flex align-items-center justify-content-center gap-2">
              <FaHome />
              <span>Return to Homepage</span>
            </Link>
            <Link to="/destinations" className="btn btn-brand-outline-light px-4 py-3 d-flex align-items-center justify-content-center gap-2">
              <FaSearch />
              <span>Explore Destinations</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
