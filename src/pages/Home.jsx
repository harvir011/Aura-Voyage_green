import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import Loader from '../components/Loader';
import CountUp from '../components/CountUp';
import { getFeaturedDestinations } from '../services/countriesApi';
import { 
  FaDollarSign, 
  FaUserCheck, 
  FaHeadset, 
  FaQuoteLeft, 
  FaStar, 
  FaArrowRight, 
  FaGlobe, 
  FaPaperPlane,
  FaShieldAlt,
  FaAward
} from 'react-icons/fa';

const Home = ({ onOpenBookingModal }) => {
  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      const data = await getFeaturedDestinations();
      setFeaturedCountries(data);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="home-page overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Popular Destinations */}
      <section className="py-5 my-4 bg-brand-light">
        <div className="container py-4">
          <motion.div 
            className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div>
              <span className="badge badge-pill-brand mb-2">Curated Journeys</span>
              <h2 className="display-5 font-serif text-brand-dark fw-bold mb-0">
                Popular Destinations
              </h2>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/destinations" className="btn btn-brand-outline d-inline-flex align-items-center gap-2 mt-3 mt-md-0">
                <span>View All Destinations</span>
                <FaArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          {loading ? (
            <Loader text="Fetching top curated destinations..." />
          ) : (
            <div className="row g-4">
              {featuredCountries.slice(0, 6).map((country, idx) => (
                <DestinationCard key={country.cca3 || country.name?.common} country={country} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-5 bg-brand-dark text-white position-relative">
        <div className="container py-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-5" 
            style={{ maxWidth: '650px' }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <span className="badge bg-brand-accent text-brand-dark fw-bold px-3 py-2 rounded-pill mb-3">
              The AuraVoyage Promise
            </span>
            <h2 className="display-5 font-serif fw-bold text-white mb-3">
              Why Choose AuraVoyage
            </h2>
            <p className="text-white-50">
              We combine years of luxury concierge expertise, exclusive partnerships, and 24/7 dedicated care to create flawless global expeditions.
            </p>
          </motion.div>

          <div className="row g-4">
            {/* Card 1: Affordable Trips */}
            <div className="col-md-4">
              <motion.div 
                className="glass-dark-card p-4 h-100 text-center d-flex flex-column align-items-center justify-content-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, borderColor: 'rgba(236, 243, 158, 0.4)' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-brand-accent text-brand-dark rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                  <FaDollarSign size={30} className="text-brand-secondary" />
                </div>
                <h3 className="h4 font-serif text-brand-accent mb-3">Affordable Luxury</h3>
                <p className="text-white-80 small mb-0" style={{ lineHeight: '1.7' }}>
                  Exclusive direct-contracted rates with five-star resorts and private villas, delivering unparalleled value without compromising quality.
                </p>
              </motion.div>
            </div>

            {/* Card 2: Expert Guides */}
            <div className="col-md-4">
              <motion.div 
                className="glass-dark-card p-4 h-100 text-center d-flex flex-column align-items-center justify-content-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, borderColor: 'rgba(236, 243, 158, 0.4)' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-brand-accent text-brand-dark rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                  <FaUserCheck size={28} className="text-brand-secondary" />
                </div>
                <h3 className="h4 font-serif text-brand-accent mb-3">Expert Local Guides</h3>
                <p className="text-white-80 small mb-0" style={{ lineHeight: '1.7' }}>
                  Hand-selected certified historians and native guides who unlock hidden gems, cultural secrets, and VIP access to world monuments.
                </p>
              </motion.div>
            </div>

            {/* Card 3: 24/7 Support */}
            <div className="col-md-4">
              <motion.div 
                className="glass-dark-card p-4 h-100 text-center d-flex flex-column align-items-center justify-content-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, borderColor: 'rgba(236, 243, 158, 0.4)' }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-brand-accent text-brand-dark rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
                  <FaHeadset size={28} className="text-brand-secondary" />
                </div>
                <h3 className="h4 font-serif text-brand-accent mb-3">24/7 Global Support</h3>
                <p className="text-white-80 small mb-0" style={{ lineHeight: '1.7' }}>
                  Your personal travel concierge is available around the clock to assist with flight changes, dinner reservations, or emergency care.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience Feature Banner with CountUp Numbers */}
      <section className="py-5 bg-white position-relative">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div 
                className="position-relative"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Chalet in Switzerland" 
                  className="w-100 rounded-18 shadow-2xl img-fluid" 
                />
                <div className="glass-card position-absolute bottom-0 end-0 m-4 p-3 d-none d-sm-block text-brand-dark" style={{ maxWidth: '240px' }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <FaAward className="text-brand-primary fs-4" />
                    <span className="fw-bold">Award Winner</span>
                  </div>
                  <small className="text-muted">Voted #1 International Luxury Tour Operator 2025</small>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="badge badge-pill-brand mb-2">Unmatched Craftsmanship</span>
                <h2 className="display-5 font-serif text-brand-dark fw-bold mb-4">
                  Redefining How The World Travels
                </h2>
                <p className="text-muted mb-4 lead font-light" style={{ lineHeight: '1.7' }}>
                  At AuraVoyage, every itinerary is custom handcrafted around your personal desires. Whether sipping champagne in Paris or exploring Kyoto’s ancient temples, we make dream journeys a reality.
                </p>
                
                {/* CountUp Statistics */}
                <div className="row g-4 mb-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-4">
                        <FaGlobe />
                      </div>
                      <div>
                        <h4 className="fw-bold text-brand-dark mb-0 font-serif fs-2">
                          <CountUp end={120} suffix="+" />
                        </h4>
                        <small className="text-muted">Countries Covered</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-4">
                        <FaShieldAlt />
                      </div>
                      <div>
                        <h4 className="fw-bold text-brand-dark mb-0 font-serif fs-2">
                          <CountUp end={100} suffix="%" />
                        </h4>
                        <small className="text-muted">Protected & Insured</small>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button 
                  className="btn btn-brand-primary btn-lg px-4 shadow-md" 
                  onClick={onOpenBookingModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plan Your Private Journey
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-5 bg-brand-light">
        <div className="container py-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-5" 
            style={{ maxWidth: '650px' }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="badge badge-pill-brand mb-2">Client Impressions</span>
            <h2 className="display-5 font-serif text-brand-dark fw-bold mb-3">
              Stories From Our Explorers
            </h2>
            <p className="text-muted">
              Read real reviews from travelers who experienced the magic of AuraVoyage.
            </p>
          </motion.div>

          <div className="row g-4">
            {/* Testimonial 1 */}
            <div className="col-md-4">
              <motion.div 
                className="card luxury-card h-100 p-4 border-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <FaQuoteLeft className="text-brand-accent fs-2" />
                  <div className="text-warning d-flex gap-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p className="card-text text-muted mb-4 fst-italic">
                  "Our custom tour to Japan was flawless from start to finish. The private ryokan in Kyoto and helicopter tour over Fuji exceeded every expectation!"
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                    alt="Sophia Martinez" 
                    className="rounded-circle object-fit-cover"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div>
                    <h5 className="h6 mb-0 text-brand-dark fw-bold">Sophia Martinez</h5>
                    <small className="text-muted">Traveled to Tokyo & Kyoto</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-md-4">
              <motion.div 
                className="card luxury-card h-100 p-4 border-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6 }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <FaQuoteLeft className="text-brand-accent fs-2" />
                  <div className="text-warning d-flex gap-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p className="card-text text-muted mb-4 fst-italic">
                  "AuraVoyage arranged a last-minute safari lodge in Kenya that was completely sold out everywhere else. Unbelievable 24/7 concierge!"
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
                    alt="Marcus Vance" 
                    className="rounded-circle object-fit-cover"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div>
                    <h5 className="h6 mb-0 text-brand-dark fw-bold">Marcus Vance</h5>
                    <small className="text-muted">Traveled to Kenya</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-md-4">
              <motion.div 
                className="card luxury-card h-100 p-4 border-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -6 }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <FaQuoteLeft className="text-brand-accent fs-2" />
                  <div className="text-warning d-flex gap-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p className="card-text text-muted mb-4 fst-italic">
                  "The Swiss Alps itinerary was breathtaking. Every hotel transfer, ski pass, and fondue dinner was seamlessly arranged. 10/10!"
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" 
                    alt="Elena Rostova" 
                    className="rounded-circle object-fit-cover"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div>
                    <h5 className="h6 mb-0 text-brand-dark fw-bold">Elena Rostova</h5>
                    <small className="text-muted">Traveled to Switzerland</small>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Signup Section */}
      <section className="py-5 bg-brand-dark text-white position-relative">
        <div className="container py-4">
          <motion.div 
            className="glass-dark-card p-4 p-md-5 rounded-18 text-center" 
            style={{ maxWidth: '800px', margin: '0 auto' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge bg-brand-accent text-brand-dark fw-bold mb-3 px-3 py-2 rounded-pill">
              Private Travel Journal
            </span>
            <h2 className="display-6 font-serif fw-bold text-white mb-3">
              Unlock Exclusive Destination Deals
            </h2>
            <p className="text-white-50 mb-4 max-w-lg mx-auto">
              Join over 50,000 discerning travelers. Receive curated luxury destination guides, early-bird expedition offers, and VIP perks.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to AuraVoyage Insider!');
              }} 
              className="row g-2 justify-content-center max-w-md mx-auto"
            >
              <div className="col-12 col-sm-8">
                <input 
                  type="email" 
                  className="form-control form-control-lg rounded-pill ps-4 bg-white text-dark border-0 shadow-none focus-glow" 
                  placeholder="Enter your email address" 
                  required 
                />
              </div>
              <div className="col-12 col-sm-4 d-grid">
                <motion.button 
                  type="submit" 
                  className="btn btn-brand-accent btn-lg text-dark fw-bold d-flex align-items-center justify-content-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane />
                  <span>Subscribe</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
