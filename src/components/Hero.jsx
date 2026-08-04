import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaGlobeAmericas, FaMapMarkerAlt, FaCompass, FaStar, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    let url = '/destinations';
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (selectedRegion) params.append('region', selectedRegion);
    if (params.toString()) url += `?${params.toString()}`;
    navigate(url);
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center text-white overflow-hidden" style={{ marginTop: '-72px', paddingTop: '72px' }}>
      {/* Background Image with Slow Motion Zoom */}
      <motion.div 
        className="position-absolute top-0 start-0 w-100 h-100"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(19, 42, 19, 0.65), rgba(19, 42, 19, 0.85)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9)',
          zIndex: 1
        }}
      />

      {/* Floating Animated Gradient Glow Circles */}
      <motion.div 
        className="position-absolute rounded-circle"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(236, 243, 158, 0.15) 0%, rgba(19, 42, 19, 0) 70%)',
          top: '15%',
          right: '8%',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'blur(30px)'
        }}
      />

      <motion.div 
        className="position-absolute rounded-circle"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(79, 119, 45, 0.25) 0%, rgba(19, 42, 19, 0) 70%)',
          bottom: '10%',
          left: '5%',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'blur(40px)'
        }}
      />

      {/* Hero Content Container */}
      <motion.div 
        className="container position-relative z-3 py-5 my-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="row justify-content-center text-center">
          <div className="col-lg-10 col-xl-9">
            {/* Tagline Badge */}
            <motion.div variants={itemVariants}>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-25 mb-4 backdrop-blur shadow-sm">
                <FaStar className="text-brand-accent fs-6" />
                <span className="small font-medium text-brand-accent tracking-wider text-uppercase">Bespoke World Tours & Luxury Retreats</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="display-2 fw-extrabold font-serif mb-4 text-white lh-sm">
              Discover Your Next <span className="text-brand-accent italic">Adventure</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="lead fs-4 text-white-80 mb-5 max-w-2xl mx-auto fw-light" style={{ maxWidth: '750px' }}>
              Explore the world's most beautiful destinations. Tailored itineraries, pristine landscapes, and unmatched luxury stays tailored just for you.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div variants={itemVariants} className="d-flex flex-sm-row flex-column justify-content-center align-items-center gap-3 mb-5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/destinations" className="btn btn-brand-accent btn-lg px-4 py-3 shadow-lg d-flex align-items-center gap-2">
                  <FaCompass />
                  <span>Explore Destinations</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/about" className="btn btn-brand-outline-light btn-lg px-4 py-3">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Interactive Floating Search Widget */}
            <motion.div variants={itemVariants} className="glass-dark-card p-3 p-md-4 shadow-2xl mx-auto" style={{ maxWidth: '850px' }}>
              <form onSubmit={handleHeroSearch} className="row g-3 align-items-center text-start">
                <div className="col-md-5">
                  <label className="form-label small text-white-50 mb-1 d-flex align-items-center gap-1">
                    <FaMapMarkerAlt className="text-brand-accent" /> Destination
                  </label>
                  <input
                    type="text"
                    className="form-control bg-white bg-opacity-10 text-white border-white border-opacity-25 rounded-pill placeholder-white-50 shadow-none focus-glow"
                    placeholder="e.g. France, Japan, Italy..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-white-50 mb-1 d-flex align-items-center gap-1">
                    <FaGlobeAmericas className="text-brand-accent" /> Region
                  </label>
                  <select
                    className="form-select bg-dark text-white border-white border-opacity-25 rounded-pill shadow-none"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="">All Continent Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
                <div className="col-md-3 d-grid">
                  <label className="form-label small opacity-0 mb-1 d-none d-md-block">Search</label>
                  <motion.button 
                    type="submit" 
                    className="btn btn-brand-primary py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaSearch />
                    <span>Search</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div variants={itemVariants} className="row g-3 justify-content-center mt-4 text-white-50 small">
              <div className="col-auto d-flex align-items-center gap-2">
                <span className="badge rounded-circle bg-brand-accent p-1">✓</span> 250+ Global Destinations
              </div>
              <div className="col-auto d-flex align-items-center gap-2">
                <span className="badge rounded-circle bg-brand-accent p-1">✓</span> Verified 5-Star Accommodations
              </div>
              <div className="col-auto d-flex align-items-center gap-2">
                <span className="badge rounded-circle bg-brand-accent p-1">✓</span> 24/7 Dedicated Concierge
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-none d-md-block text-white-50 text-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <small className="d-block text-uppercase tracking-wider mb-1" style={{ fontSize: '0.65rem' }}>Scroll Down</small>
          <FaChevronDown className="text-brand-accent" size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
