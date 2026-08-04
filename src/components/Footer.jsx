import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas, FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPaperPlane, FaArrowUp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white pt-5 pb-4 border-top border-dark position-relative">
      <div className="container">
        <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-25">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-white fs-3 mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #ecf39e 0%, #90a955 100%)' }}>
                <FaGlobeAmericas className="fs-5 text-brand-dark" />
              </div>
              <span style={{ fontFamily: 'Playfair Display, serif' }}>Aura<span className="text-brand-accent">Voyage</span></span>
            </Link>
            <p className="text-white-50 mb-4 pe-lg-3" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
              Crafting extraordinary luxury journeys to the world’s most breathtaking destinations. Exceptional service, bespoke itineraries, and unforgettable memories.
            </p>
            <div className="d-flex gap-3">
              <a href="#instagram" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#facebook" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="#twitter" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#youtube" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-brand-accent font-serif mb-3">Quick Navigation</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li><Link to="/" className="text-white-50 text-decoration-none hover-accent">Home</Link></li>
              <li><Link to="/destinations" className="text-white-50 text-decoration-none hover-accent">All Destinations</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none hover-accent">About AuraVoyage</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none hover-accent">Contact Support</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-brand-accent font-serif mb-3">Popular Regions</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li><Link to="/destinations?region=Europe" className="text-white-50 text-decoration-none hover-accent">European Escapes</Link></li>
              <li><Link to="/destinations?region=Asia" className="text-white-50 text-decoration-none hover-accent">Asian Wonders</Link></li>
              <li><Link to="/destinations?region=Americas" className="text-white-50 text-decoration-none hover-accent">The Americas</Link></li>
              <li><Link to="/destinations?region=Africa" className="text-white-50 text-decoration-none hover-accent">African Safaris</Link></li>
              <li><Link to="/destinations?region=Oceania" className="text-white-50 text-decoration-none hover-accent">Oceania & Pacific</Link></li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-brand-accent font-serif mb-3">Stay Inspired</h5>
            <p className="text-white-50 small mb-3">
              Subscribe to receive private travel offers and seasonal destination updates.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to AuraVoyage Insider!'); }} className="mb-3">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control bg-dark text-white border-secondary border-opacity-50 rounded-pill-start ps-3" 
                  placeholder="Your email address" 
                  required 
                />
                <button type="submit" className="btn btn-brand-accent text-dark rounded-pill-end px-3">
                  <FaPaperPlane />
                </button>
              </div>
            </form>
            <div className="small text-white-50 d-flex flex-column gap-1">
              <span className="d-flex align-items-center gap-2"><FaEnvelope className="text-brand-accent"/> concierge@auravoyage.com</span>
              <span className="d-flex align-items-center gap-2"><FaPhoneAlt className="text-brand-accent"/> +1 (800) 888-AURA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-4 small text-white-50">
          <p className="mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} AuraVoyage Travel Ltd. All Rights Reserved. Crafted for luxury explorers.
          </p>
          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={scrollToTop} 
              className="btn btn-brand-primary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0" 
              style={{ width: '38px', height: '38px' }}
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
