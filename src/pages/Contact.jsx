


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube 
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    destinationInterest: 'General Inquiry'
  });
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        destinationInterest: 'General Inquiry'
      });
    }, 6000);
  };

  return (
    <div className="contact-page bg-brand-light min-vh-100 pb-5">
      {/* 1. Header Banner */}
      <section className="bg-brand-dark text-white py-5 position-relative">
        <div className="container py-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge bg-brand-accent text-dark font-semibold px-3 py-2 rounded-pill mb-3">
              24/7 Global Concierge
            </span>
            <h1 className="display-4 font-serif fw-bold text-white mb-3">
              Contact AuraVoyage
            </h1>
            <p className="lead text-white-80 max-w-lg mx-auto font-light" style={{ maxWidth: '650px' }}>
              Have a question about a destination or wish to plan a private customized tour? Our luxury travel advisors are ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Form & Info Section */}
      <div className="container mt-n4 position-relative z-3">
        <div className="row g-4">
          {/* Left Column: Contact Form */}
          <div className="col-lg-7">
            <motion.div 
              className="glass-card p-4 p-md-5 shadow-lg"
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <h2 className="h3 font-serif text-brand-dark fw-bold mb-2">Send Us a Message</h2>
              <p className="text-muted small mb-4">
                Fill out the form below and a senior travel advisor will get back to you within 2 business hours.
              </p>

              {submitted ? (
                <motion.div 
                  className="alert alert-success p-4 rounded-18 d-flex align-items-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <FaCheckCircle className="fs-1 text-success flex-shrink-0" />
                  <div>
                    <h5 className="alert-heading font-serif fw-bold mb-1">Message Sent Successfully!</h5>
                    <p className="mb-0 small text-success-emphasis">
                      Thank you, <strong>{formData.name || 'Valued Traveler'}</strong>. Our luxury concierge team has received your inquiry and will reach out shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label font-medium text-brand-dark small">Your Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label font-medium text-brand-dark small">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                        placeholder="john@example.com" 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-medium text-brand-dark small">Subject *</label>
                      <input 
                        type="text" 
                        name="subject" 
                        required 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className="form-control rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                        placeholder="e.g. Booking inquiry for Japan" 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-medium text-brand-dark small">Region of Interest</label>
                      <select 
                        name="destinationInterest" 
                        value={formData.destinationInterest} 
                        onChange={handleChange}
                        className="form-select rounded-pill px-3 py-2 border-light shadow-none focus-glow"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Europe">Europe (France, Italy, Swiss)</option>
                        <option value="Asia">Asia (Japan, Thailand)</option>
                        <option value="Africa">Africa Safaris (Kenya, Egypt)</option>
                        <option value="Americas">Americas (Brazil, Canada)</option>
                        <option value="Oceania">Oceania (Australia, NZ)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label font-medium text-brand-dark small">Your Message / Special Requests *</label>
                      <textarea 
                        name="message" 
                        rows="4" 
                        required 
                        value={formData.message} 
                        onChange={handleChange} 
                        className="form-control rounded-18 p-3 border-light shadow-none focus-glow"
                        placeholder="Tell us about your trip dates, preferred accommodation style, group size, and any special experiences..."
                      />
                    </div>

                    <div className="col-12 d-grid mt-4">
                      <motion.button 
                        type="submit" 
                        className="btn btn-brand-primary btn-lg shadow-md d-flex align-items-center justify-content-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column: Company Info & Details */}
          <div className="col-lg-5">
            <motion.div 
              className="card luxury-card p-4 p-md-5 mb-4 border-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="h4 font-serif text-brand-dark fw-bold mb-4">Concierge Headquarters</h3>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">Global Headquarters</h5>
                    <p className="text-muted small mb-0">740 Park Avenue, Suite 1200<br/>New York, NY 10021, USA</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">Direct Phone Lines</h5>
                    <p className="text-muted small mb-0">+1 (800) 888-LUXE (Toll-Free)<br/>+1 (212) 555-9080 (International)</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">Electronic Mail</h5>
                    <p className="text-muted small mb-0">concierge@AuraVoyage.com<br/>vip-bookings@AuraVoyage.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                    <FaClock />
                  </div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">Operating Hours</h5>
                    <p className="text-muted small mb-0">Monday – Sunday: 24 Hours / 7 Days<br/>Continuous Concierge Care</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-4 pt-4 border-top border-light">
                <h5 className="h6 font-bold text-brand-dark mb-3">Connect On Social</h5>
                <div className="d-flex gap-3">
                  <motion.a href="#instagram" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} whileHover={{ scale: 1.15, color: '#4f772d' }} aria-label="Instagram">
                    <FaInstagram />
                  </motion.a>
                  <motion.a href="#facebook" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} whileHover={{ scale: 1.15, color: '#4f772d' }} aria-label="Facebook">
                    <FaFacebookF />
                  </motion.a>
                  <motion.a href="#twitter" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} whileHover={{ scale: 1.15, color: '#4f772d' }} aria-label="Twitter">
                    <FaTwitter />
                  </motion.a>
                  <motion.a href="#youtube" className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} whileHover={{ scale: 1.15, color: '#4f772d' }} aria-label="YouTube">
                    <FaYoutube />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Embedded Map Placeholder */}
        <motion.div 
          className="glass-card p-3 my-5 rounded-18 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="h5 font-serif text-brand-dark fw-bold p-2 mb-3 d-flex align-items-center gap-2">
            <FaMapMarkerAlt className="text-brand-primary" /> Interactive Map Location
          </h3>
          <div className="rounded-18 overflow-hidden" style={{ height: '350px' }}>
            <iframe 
              title="AuraVoyage Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.7588147171424!2d-73.9675276234241!3d40.76735197138541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb8d40a23d%3A0x7d02580ef135677e!2sPark%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
