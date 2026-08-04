import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAmericas, FaSearch, FaCalendarCheck } from 'react-icons/fa';

const Navbar = ({ onOpenBookingModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchInput(false);
      setSearchQuery('');
      setIsNavOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -15,
      height: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <header 
      className="sticky-top w-100 position-sticky top-0 start-0" 
      style={{ 
        zIndex: 1050, 
        background: scrolled 
          ? 'rgba(19, 42, 19, 0.94)' 
          : 'rgba(19, 42, 19, 0.86)',
        backdropFilter: scrolled ? 'blur(28px)' : 'blur(18px)',
        WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'blur(18px)',
        borderBottom: '1px solid rgba(236, 243, 158, 0.18)',
        boxShadow: scrolled
          ? '0 12px 35px rgba(0, 0, 0, 0.45)'
          : '0 6px 25px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="container-fluid px-4 px-lg-5" style={{ maxWidth: '1400px' }}>
        <nav 
          className="navbar navbar-expand-lg navbar-dark p-0 align-items-center justify-content-between"
          style={{
            minHeight: scrolled ? '75px' : '88px',
            paddingTop: scrolled ? '0.9rem' : '1.35rem',
            paddingBottom: scrolled ? '0.9rem' : '1.35rem',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* 1. Premium Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center gap-2 m-0 p-0" to="/">
            <motion.div 
              className="rounded-circle d-flex align-items-center justify-content-center" 
              style={{ 
                width: '46px', 
                height: '46px', 
                background: 'linear-gradient(135deg, #ecf39e 0%, #90a955 100%)',
                boxShadow: '0 0 18px rgba(236, 243, 158, 0.4)'
              }}
              whileHover={{ rotate: 360, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <FaGlobeAmericas className="fs-4 text-brand-dark" />
            </motion.div>
            <span className="fs-2 fw-bold text-white tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
              Aura<span className="text-brand-accent">Voyage</span>
            </span>
          </Link>

          {/* 2. Desktop Center Navigation Links */}
          <div className="collapse navbar-collapse d-none d-lg-flex" id="auraVoyageNavbar">
            <ul className="navbar-nav mx-auto gap-3 text-center align-items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li className="nav-item position-relative px-1" key={link.path}>
                    <NavLink 
                      className={`nav-link px-4 py-2.5 fs-6 font-medium transition-all text-white-80 ${isActive ? 'text-brand-accent font-bold' : 'hover-accent'}`}
                      to={link.path}
                    >
                      <motion.span 
                        className="d-inline-block position-relative z-2"
                        whileHover={{ y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        {link.name}
                      </motion.span>
                      {isActive && (
                        <motion.div 
                          className="position-absolute top-0 start-0 w-100 h-100 rounded-pill z-1"
                          style={{
                            background: 'rgba(236, 243, 158, 0.15)',
                            border: '1px solid rgba(236, 243, 158, 0.3)',
                            boxShadow: '0 0 14px rgba(236, 243, 158, 0.22)'
                          }}
                          layoutId="navbar-active-glass-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 3. Right Side Actions (Search & CTA Button) */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {/* Quick Search Toggle / Input */}
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="d-flex align-items-center position-relative" style={{ width: '220px' }}>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill pe-4 bg-dark text-white border-brand-accent focus-glow shadow-none fs-6"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-link text-brand-accent p-0 position-absolute end-0 me-3" aria-label="Search">
                  <FaSearch size={14} />
                </button>
              </form>
            ) : (
              <motion.button 
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center text-brand-accent border-0" 
                style={{ width: '44px', height: '44px', background: 'rgba(255, 255, 255, 0.12)' }}
                onClick={() => setShowSearchInput(true)}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.9 }}
                title="Quick Search"
                aria-label="Search Destinations"
              >
                <FaSearch size={16} />
              </motion.button>
            )}

            {/* Standout Primary CTA "Book Now" Button */}
            <motion.button 
              className="btn text-dark fw-bold d-flex align-items-center gap-2 px-4 py-3 rounded-pill border-0 fs-6 shadow-md"
              style={{
                background: 'linear-gradient(135deg, #ecf39e 0%, #90a955 100%)',
                boxShadow: '0 4px 20px rgba(236, 243, 158, 0.4)'
              }}
              onClick={onOpenBookingModal}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 8px 28px rgba(236, 243, 158, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <FaCalendarCheck size={17} />
              <span>Book Now</span>
            </motion.button>
          </div>

          {/* 4. Custom Mobile Toggle */}
          <motion.button 
            className="navbar-toggler border-0 p-2 d-lg-none text-brand-accent shadow-none" 
            type="button" 
            onClick={() => setIsNavOpen(!isNavOpen)}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle navigation"
          >
            <div className="d-flex flex-column gap-1.5 align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
              <motion.span 
                className="bg-brand-accent rounded-pill d-block" 
                style={{ width: '24px', height: '2.5px' }}
                animate={isNavOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="bg-brand-accent rounded-pill d-block" 
                style={{ width: '24px', height: '2.5px' }}
                animate={isNavOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="bg-brand-accent rounded-pill d-block" 
                style={{ width: '24px', height: '2.5px' }}
                animate={isNavOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </nav>

        {/* 5. Mobile Drawer Panel */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div 
              className="w-100 d-lg-none py-4 px-3 border-top border-secondary border-opacity-25"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ul className="navbar-nav gap-2 text-center mb-4">
                {navLinks.map((link) => (
                  <motion.li className="nav-item" key={link.path} variants={mobileItemVariants}>
                    <NavLink 
                      className={({ isActive }) => `nav-link py-2.5 fs-5 font-serif rounded-pill transition-all ${isActive ? 'text-brand-accent fw-bold bg-white bg-opacity-10' : 'text-white'}`}
                      to={link.path}
                      onClick={() => setIsNavOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div className="d-flex flex-column gap-3" variants={mobileItemVariants}>
                <form onSubmit={handleSearchSubmit} className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill pe-4 bg-dark text-white border-brand-accent focus-glow shadow-none fs-6"
                    placeholder="Search country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="btn btn-brand-accent rounded-circle ms-2 p-3" aria-label="Search">
                    <FaSearch size={14} />
                  </button>
                </form>

                <motion.button 
                  className="btn text-dark fw-bold w-100 py-3.5 rounded-pill d-flex align-items-center justify-content-center gap-2 border-0 fs-6"
                  style={{
                    background: 'linear-gradient(135deg, #ecf39e 0%, #90a955 100%)',
                    boxShadow: '0 4px 20px rgba(236, 243, 158, 0.45)'
                  }}
                  onClick={() => {
                    setIsNavOpen(false);
                    onOpenBookingModal();
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCalendarCheck size={18} />
                  <span>Book Now</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
