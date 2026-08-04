import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from '../components/CountUp';
import { FaGlobeAmericas, FaAward, FaUsers, FaCompass, FaRegHeart, FaEye, FaRocket, FaLinkedin, FaTwitter } from 'react-icons/fa';

const About = ({ onOpenBookingModal }) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="about-page bg-brand-light min-vh-100 pb-5">
      {/* 1. Hero Banner */}
      <section className="position-relative text-white py-5 bg-brand-dark overflow-hidden">
        <div className="container py-5 my-3 position-relative z-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge bg-brand-accent text-dark font-semibold px-3 py-2 rounded-pill mb-3">
              Our Heritage & Passion
            </span>
            <h1 className="display-3 font-serif fw-bold text-white mb-4">
              Pioneering Luxury Travel <span className="text-brand-accent italic">Since 2012</span>
            </h1>
            <p className="lead text-white-80 max-w-2xl mx-auto font-light" style={{ maxWidth: '750px' }}>
              AuraVoyage was born from a singular vision: to connect extraordinary people with extraordinary places, crafting seamless bespoke travel memories across the seven continents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Company Story */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="badge badge-pill-brand mb-2">The AuraVoyage Story</span>
                <h2 className="display-5 font-serif text-brand-dark fw-bold mb-4">
                  From Passionate Explorers to Global Luxury Leaders
                </h2>
                <p className="text-muted mb-3 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  Founded in Geneva in 2012, AuraVoyage started as an exclusive private travel atelier servicing high-net-worth families and culture enthusiasts. Over the past decade, we have expanded into a premier global travel authority with offices in Paris, Tokyo, New York, and Sydney.
                </p>
                <p className="text-muted mb-4 leading-relaxed" style={{ lineHeight: '1.8' }}>
                  Our team of over 150 local destination specialists hand-verify every hotel, private yacht charter, and culinary experience to ensure every journey exceeds expectations.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div 
                className="row g-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="col-6">
                  <img 
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" 
                    alt="Paris Eiffel View" 
                    className="w-100 rounded-18 shadow-md object-fit-cover"
                    style={{ height: '240px' }}
                  />
                </div>
                <div className="col-6 mt-4">
                  <img 
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" 
                    alt="Kyoto Bamboo" 
                    className="w-100 rounded-18 shadow-md object-fit-cover"
                    style={{ height: '240px' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-4">
            {/* Mission */}
            <div className="col-md-6">
              <motion.div 
                className="glass-card p-4 p-md-5 h-100 border-0 shadow-sm"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-brand-light text-brand-primary rounded-circle d-inline-flex p-3 mb-4 fs-3">
                  <FaRocket />
                </div>
                <h3 className="h4 font-serif text-brand-dark fw-bold mb-3">Our Mission</h3>
                <p className="text-muted leading-relaxed" style={{ lineHeight: '1.7' }}>
                  To inspire authentic global connection by designing sustainable, deeply immersive, and hassle-free luxury expeditions tailored to each traveler's individual dreams.
                </p>
              </motion.div>
            </div>

            {/* Vision */}
            <div className="col-md-6">
              <motion.div 
                className="glass-card p-4 p-md-5 h-100 border-0 shadow-sm"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-brand-light text-brand-primary rounded-circle d-inline-flex p-3 mb-4 fs-3">
                  <FaEye />
                </div>
                <h3 className="h4 font-serif text-brand-dark fw-bold mb-3">Our Vision</h3>
                <p className="text-muted leading-relaxed" style={{ lineHeight: '1.7' }}>
                  To redefine luxury tourism through responsible travel initiatives, supporting local heritage conservation, eco-conscious lodges, and zero-carbon transportation partnerships.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Statistics Banner with CountUp */}
      <section className="py-5 bg-brand-dark text-white">
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <h3 className="display-4 font-serif text-brand-accent fw-bold mb-1">
                <CountUp end={120} suffix="+" />
              </h3>
              <p className="text-white-50 mb-0 font-medium">Global Destinations</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-4 font-serif text-brand-accent fw-bold mb-1">
                <CountUp end={50000} suffix="+" />
              </h3>
              <p className="text-white-50 mb-0 font-medium">Happy Explorers</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-4 font-serif text-brand-accent fw-bold mb-1">
                <CountUp end={99.4} suffix="%" />
              </h3>
              <p className="text-white-50 mb-0 font-medium">Satisfaction Rate</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="display-4 font-serif text-brand-accent fw-bold mb-1">
                <CountUp end={14} />
              </h3>
              <p className="text-white-50 mb-0 font-medium">Global Industry Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team Members */}
      <section className="py-5 bg-brand-light">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5" style={{ maxWidth: '650px' }}>
            <span className="badge badge-pill-brand mb-2">Leadership Atelier</span>
            <h2 className="display-5 font-serif text-brand-dark fw-bold mb-3">
              Meet Our Founders & Experts
            </h2>
            <p className="text-muted">
              Dedicated travel visionaries working around the clock to curate your next expedition.
            </p>
          </div>

          <div className="row g-4">
            {/* Team Member 1 */}
            <div className="col-md-4">
              <motion.div 
                className="card luxury-card text-center border-0 p-4"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" 
                  alt="Julian Vance" 
                  className="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm"
                  style={{ width: '120px', height: '120px' }}
                />
                <h4 className="h5 font-serif text-brand-dark fw-bold mb-1">Julian Vance</h4>
                <p className="text-brand-primary small fw-semibold mb-3">Co-Founder & Chief Expedition Officer</p>
                <p className="text-muted small mb-4">Veteran explorer who has visited over 95 countries across 2 decades.</p>
                <div className="d-flex justify-content-center gap-2">
                  <a href="#linkedin" className="btn btn-sm btn-outline-secondary rounded-circle"><FaLinkedin /></a>
                  <a href="#twitter" className="btn btn-sm btn-outline-secondary rounded-circle"><FaTwitter /></a>
                </div>
              </motion.div>
            </div>

            {/* Team Member 2 */}
            <div className="col-md-4">
              <motion.div 
                className="card luxury-card text-center border-0 p-4"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
                  alt="Camille Laurent" 
                  className="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm"
                  style={{ width: '120px', height: '120px' }}
                />
                <h4 className="h5 font-serif text-brand-dark fw-bold mb-1">Camille Laurent</h4>
                <p className="text-brand-primary small fw-semibold mb-3">Head of Luxury Concierge</p>
                <p className="text-muted small mb-4">Former Paris 5-star hotel head concierge specializing in private access tours.</p>
                <div className="d-flex justify-content-center gap-2">
                  <a href="#linkedin" className="btn btn-sm btn-outline-secondary rounded-circle"><FaLinkedin /></a>
                  <a href="#twitter" className="btn btn-sm btn-outline-secondary rounded-circle"><FaTwitter /></a>
                </div>
              </motion.div>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-4">
              <motion.div 
                className="card luxury-card text-center border-0 p-4"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" 
                  alt="Kenji Takahashi" 
                  className="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm"
                  style={{ width: '120px', height: '120px' }}
                />
                <h4 className="h5 font-serif text-brand-dark fw-bold mb-1">Kenji Takahashi</h4>
                <p className="text-brand-primary small fw-semibold mb-3">Director of Asia-Pacific Travel</p>
                <p className="text-muted small mb-4">Passionate advocate for cultural preservation and private island retreats.</p>
                <div className="d-flex justify-content-center gap-2">
                  <a href="#linkedin" className="btn btn-sm btn-outline-secondary rounded-circle"><FaLinkedin /></a>
                  <a href="#twitter" className="btn btn-sm btn-outline-secondary rounded-circle"><FaTwitter /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-5 bg-white text-center">
        <div className="container py-4">
          <div className="max-w-2xl mx-auto" style={{ maxWidth: '650px' }}>
            <h2 className="display-6 font-serif text-brand-dark fw-bold mb-3">
              Ready to Craft Your Next Journey?
            </h2>
            <p className="text-muted lead mb-4">
              Let our luxury travel concierges tailor an unforgettable itinerary designed specifically around your preferences.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <motion.button 
                onClick={onOpenBookingModal} 
                className="btn btn-brand-primary btn-lg px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Private Consultation
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <RouterLink to="/destinations" className="btn btn-brand-outline btn-lg px-4">
                  Explore Destinations
                </RouterLink>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
