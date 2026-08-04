import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUsers, FaArrowRight, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';

const DestinationCard = ({ country, index = 0 }) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!country) return null;

  const {
    name,
    capital,
    region,
    population,
    flags,
    cca3,
    heroImage,
    description,
    rating,
    pricePerNight
  } = country;

  const countryName = name?.common || 'Unknown Destination';
  const capitalName = Array.isArray(capital) && capital.length > 0 ? capital[0] : 'N/A';
  const flagSrc = flags?.png || flags?.svg || 'https://via.placeholder.com/64x40';
  const formattedPopulation = population ? Number(population).toLocaleString() : 'N/A';
  const imageCover = heroImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';

  return (
    <motion.div 
      className="col-12 col-md-6 col-lg-4"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="card luxury-card h-100 position-relative d-flex flex-column border-0"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Top Image Banner with Zoom Effect */}
        <div className="img-hover-zoom position-relative" style={{ height: '220px' }}>
          <img 
            src={imageCover} 
            alt={countryName} 
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
          />
          {/* Overlay Gradient */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100" 
            style={{ background: 'linear-gradient(to top, rgba(19, 42, 19, 0.7) 0%, transparent 60%)' }}
          />

          {/* Region Badge */}
          <div className="position-absolute top-0 start-0 m-3">
            <span className="badge badge-pill-brand bg-white text-brand-dark shadow-sm fw-bold">
              {region || 'Global'}
            </span>
          </div>

          {/* Heart Bookmark Button with Spring Motion */}
          <div className="position-absolute top-0 end-0 m-3">
            <motion.button 
              className="btn btn-dark bg-opacity-50 text-white rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
              style={{ width: '36px', height: '36px', backdropFilter: 'blur(4px)' }}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              aria-label="Bookmark Destination"
            >
              <motion.div
                animate={{ scale: isLiked ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {isLiked ? (
                  <FaHeart className="text-danger" size={16} />
                ) : (
                  <FaRegHeart size={16} />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Flag & Rating Badge */}
          <div className="position-absolute bottom-0 start-0 end-0 m-3 d-flex align-items-center justify-content-between text-white">
            <div className="d-flex align-items-center gap-2">
              <img 
                src={flagSrc} 
                alt={`${countryName} flag`} 
                className="rounded shadow-sm"
                style={{ width: '28px', height: '20px', objectFit: 'cover' }}
              />
              <span className="fw-semibold small">{countryName}</span>
            </div>
            {rating && (
              <div className="badge bg-dark bg-opacity-75 text-brand-accent d-flex align-items-center gap-1 rounded-pill">
                <FaStar className="fs-6 text-warning" />
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h3 className="h5 font-serif text-brand-dark mb-0 fw-bold">{countryName}</h3>
              {pricePerNight && (
                <span className="text-brand-primary fw-bold small">{pricePerNight} <span className="text-muted fw-normal">/ night</span></span>
              )}
            </div>

            <p className="text-muted small mb-3 text-truncate-2" style={{ height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {description || `Discover the unique sights, rich culture, and world-class luxury of ${countryName}.`}
            </p>

            {/* Quick Stats Grid */}
            <div className="row g-2 py-2 mb-3 bg-light rounded-3 px-1 border border-light">
              <div className="col-6 d-flex align-items-center gap-2 small text-secondary">
                <FaMapMarkerAlt className="text-brand-primary" />
                <span className="text-truncate"><strong>Cap:</strong> {capitalName}</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2 small text-secondary">
                <FaUsers className="text-brand-primary" />
                <span className="text-truncate"><strong>Pop:</strong> {formattedPopulation}</span>
              </div>
            </div>
          </div>

          {/* Card Footer Action */}
          <div className="pt-2 mt-auto border-top border-light">
            <Link 
              to={`/destinations/${cca3 || countryName.toLowerCase()}`}
              className="btn btn-brand-primary w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <span>View Details</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DestinationCard;
