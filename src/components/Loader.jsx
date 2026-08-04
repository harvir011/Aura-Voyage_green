import React from 'react';
import { FaCompass } from 'react-icons/fa';

const Loader = ({ text = 'Curating global luxury destinations...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5 w-100 text-center">
      <div className="position-relative mb-3">
        <div 
          className="spinner-border text-brand-primary" 
          style={{ width: '3.5rem', height: '3.5rem', borderWidth: '0.25em' }} 
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="position-absolute top-50 start-50 translate-middle text-brand-secondary">
          <FaCompass size={22} className="spin-slow" />
        </div>
      </div>
      <p className="text-brand-dark font-serif fs-5 fw-semibold mb-1">{text}</p>
      <span className="text-muted small">Please wait while we connect to REST Countries services</span>
    </div>
  );
};

export default Loader;
