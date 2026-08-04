import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';
import { FaCalendarCheck, FaCheckCircle, FaLock } from 'react-icons/fa';

// Auto scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Animated Route Wrapper
const AnimatedRoutes = ({ onOpenBookingModal }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home onOpenBookingModal={onOpenBookingModal} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:code" element={<DestinationDetails onOpenBookingModal={onOpenBookingModal} />} />
          <Route path="/about" element={<About onOpenBookingModal={() => onOpenBookingModal('')} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [targetDestination, setTargetDestination] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    specialNotes: ''
  });

  const handleOpenModal = (destinationName = '') => {
    setTargetDestination(destinationName || 'Paris, France');
    setShowBookingModal(true);
    setBookingSubmitted(false);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setBookingSubmitted(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      <div className="d-flex flex-column min-vh-100 position-relative">
        <Navbar onOpenBookingModal={() => handleOpenModal('')} />

        <main className="flex-grow-1">
          <AnimatedRoutes onOpenBookingModal={handleOpenModal} />
        </main>

        <Footer />

        {/* Global Booking Modal with Framer Motion Spring */}
        <AnimatePresence>
          {showBookingModal && (
            <div 
              className="modal show d-block" 
              tabIndex="-1" 
              style={{ backgroundColor: 'rgba(19, 42, 19, 0.8)', backdropFilter: 'blur(12px)', zIndex: 1060 }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <motion.div 
                  className="modal-content border-0 rounded-18 shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                >
                  <div className="modal-header bg-brand-dark text-white p-4 border-0 position-relative">
                    <div>
                      <span className="badge bg-brand-accent text-dark fw-bold mb-2">Bespoke Concierge</span>
                      <h5 className="modal-title font-serif fs-3 fw-bold">
                        Book Your Private Expedition
                      </h5>
                    </div>
                    <button 
                      type="button" 
                      className="btn-close btn-close-white position-absolute top-0 end-0 m-4" 
                      onClick={handleCloseModal}
                      aria-label="Close"
                    />
                  </div>

                  <div className="modal-body p-4 p-md-5 bg-brand-light">
                    {bookingSubmitted ? (
                      <div className="text-center py-4">
                        <FaCheckCircle size={60} className="text-success mb-3 animate-bounce" />
                        <h4 className="font-serif text-brand-dark fw-bold mb-2">Reservation Request Received!</h4>
                        <p className="text-muted max-w-md mx-auto mb-4">
                          Thank you, <strong>{bookingData.name || 'Traveler'}</strong>. Your private tour request for <strong>{targetDestination}</strong> has been assigned to our senior concierge.
                        </p>
                        <div className="p-3 bg-white rounded-18 border border-light text-start small mb-4">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted">Target Destination:</span>
                            <strong className="text-brand-dark">{targetDestination}</strong>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted">Group Size:</span>
                            <strong className="text-brand-dark">{bookingData.guests}</strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Preferred Start Date:</span>
                            <strong className="text-brand-dark">{bookingData.date || 'Flexible'}</strong>
                          </div>
                        </div>
                        <button className="btn btn-brand-primary px-4" onClick={handleCloseModal}>
                          Done
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit}>
                        <div className="alert alert-success bg-brand-accent bg-opacity-20 border-brand-accent text-brand-dark small mb-4 d-flex align-items-center gap-2">
                          <FaLock className="text-brand-primary" />
                          <span>Reserving: <strong>{targetDestination}</strong> • Zero deposit required for initial consultation.</span>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label font-medium small text-brand-dark">Full Name *</label>
                            <input 
                              type="text" 
                              required 
                              className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                              placeholder="e.g. Eleanor Vance" 
                              value={bookingData.name}
                              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label font-medium small text-brand-dark">Email Address *</label>
                            <input 
                              type="email" 
                              required 
                              className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                              placeholder="eleanor@example.com" 
                              value={bookingData.email}
                              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                            />
                          </div>

                          <div className="col-md-4">
                            <label className="form-label font-medium small text-brand-dark">Phone Number *</label>
                            <input 
                              type="tel" 
                              required 
                              className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                              placeholder="+1 (555) 000-0000" 
                              value={bookingData.phone}
                              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            />
                          </div>

                          <div className="col-md-4">
                            <label className="form-label font-medium small text-brand-dark">Party Size</label>
                            <select 
                              className="form-select rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                              value={bookingData.guests}
                              onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                            >
                              <option value="Solo Traveler">1 Solo Traveler</option>
                              <option value="2 Guests">2 Guests (Couple)</option>
                              <option value="3-5 Family">3-5 Family / Friends</option>
                              <option value="6+ Private Charter">6+ Private Charter</option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <label className="form-label font-medium small text-brand-dark">Travel Start Date</label>
                            <input 
                              type="date" 
                              className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                              value={bookingData.date}
                              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label font-medium small text-brand-dark">Special Preferences / Custom Requests</label>
                            <textarea 
                              rows="3"
                              className="form-control rounded-18 p-3 border-light shadow-none focus-glow"
                              placeholder="Flight preferences, dietary requirements, villa style, or anniversary celebrations..."
                              value={bookingData.specialNotes}
                              onChange={(e) => setBookingData({ ...bookingData, specialNotes: e.target.value })}
                            />
                          </div>

                          <div className="col-12 d-grid mt-4">
                            <motion.button 
                              type="submit" 
                              className="btn btn-brand-primary btn-lg shadow-md d-flex align-items-center justify-content-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaCalendarCheck />
                              <span>Confirm Reservation Request</span>
                            </motion.button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
