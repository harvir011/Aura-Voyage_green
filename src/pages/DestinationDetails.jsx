import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchCountryByCode } from '../services/countriesApi';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaGlobe, 
  FaMoneyBillWave, 
  FaLanguage, 
  FaClock, 
  FaExternalLinkAlt, 
  FaCalendarCheck, 
  FaStar,
  FaShieldAlt,
  FaPlaneDeparture
} from 'react-icons/fa';

const DestinationDetails = ({ onOpenBookingModal }) => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const data = await fetchCountryByCode(code);
      setCountry(data);
      setLoading(false);
    };
    getDetails();
  }, [code]);

  if (loading) {
    return (
      <div className="min-vh-100 bg-brand-light py-5">
        <Loader text="Retrieving destination details..." />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-vh-100 bg-brand-light py-5 text-center">
        <div className="container py-5">
          <h2 className="display-6 font-serif text-brand-dark mb-3">Destination Not Found</h2>
          <p className="text-muted mb-4">We couldn't locate details for destination code "{code}".</p>
          <Link to="/destinations" className="btn btn-brand-primary">
            Return to All Destinations
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    capital,
    population,
    region,
    subregion,
    languages,
    currencies,
    timezones,
    flags,
    maps,
    heroImage,
    description,
    rating,
    pricePerNight
  } = country;

  const commonName = name?.common || 'Destination';
  const officialName = name?.official || commonName;
  const capitalName = Array.isArray(capital) && capital.length > 0 ? capital.join(', ') : 'N/A';
  const formattedPopulation = population ? Number(population).toLocaleString() : 'N/A';
  const flagSrc = flags?.svg || flags?.png || 'https://via.placeholder.com/120x80';

  // Format Languages
  const formattedLanguages = languages 
    ? Object.values(languages).join(', ')
    : 'N/A';

  // Format Currencies
  const formattedCurrencies = currencies 
    ? Object.values(currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ')
    : 'N/A';

  // Format Timezones
  const formattedTimezones = Array.isArray(timezones) 
    ? timezones.join(', ')
    : 'N/A';

  const googleMapsUrl = maps?.googleMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(commonName)}`;

  return (
    <div className="destination-details bg-brand-light min-vh-100 pb-5">
      {/* 1. Top Hero Section */}
      <div className="position-relative text-white" style={{ height: '480px' }}>
        <img 
          src={heroImage} 
          alt={commonName} 
          className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
        />
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ background: 'linear-gradient(to top, rgba(19, 42, 19, 0.9) 0%, rgba(19, 42, 19, 0.4) 60%, rgba(19, 42, 19, 0.7) 100%)' }}
        />

        <div className="container position-relative z-3 h-100 d-flex flex-column justify-content-between py-4">
          {/* Back Button */}
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-brand-outline-light d-inline-flex align-items-center gap-2 rounded-pill shadow-sm"
            >
              <FaArrowLeft />
              <span>Back to Destinations</span>
            </button>
          </div>

          {/* Hero Header Data */}
          <div className="mb-4">
            <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
              <img 
                src={flagSrc} 
                alt={`${commonName} flag`} 
                className="rounded shadow-lg"
                style={{ width: '50px', height: '34px', objectFit: 'cover' }}
              />
              <span className="badge badge-dark-pill">{region} {subregion ? `• ${subregion}` : ''}</span>
              {rating && (
                <span className="badge bg-brand-accent text-dark fw-bold d-flex align-items-center gap-1">
                  <FaStar /> {rating} / 5.0
                </span>
              )}
            </div>

            <h1 className="display-3 font-serif fw-bold text-white mb-2">
              {commonName}
            </h1>
            <p className="lead text-white-80 mb-0 font-serif italic">
              {officialName}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Details Grid */}
      <div className="container mt-n4 position-relative z-3">
        <div className="row g-4">
          {/* Left Column: Details Cards */}
          <div className="col-lg-8">
            {/* Overview Card */}
            <div className="glass-card p-4 p-md-5 mb-4 shadow-sm">
              <h2 className="h3 font-serif text-brand-dark fw-bold mb-3">Destination Overview</h2>
              <p className="text-muted lead fs-6 mb-4" style={{ lineHeight: '1.8' }}>
                {description || `Experience the spectacular beauty and vibrant history of ${commonName}. Located in ${region}, ${commonName} offers travelers an unmatched blend of iconic architecture, natural wonders, and refined hospitality.`}
              </p>

              {/* Specs Grid */}
              <div className="row g-3 py-3 border-top border-bottom border-light">
                <div className="col-sm-6 col-md-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <small className="text-muted d-block">Capital City</small>
                      <strong className="text-brand-dark">{capitalName}</strong>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                      <FaUsers />
                    </div>
                    <div>
                      <small className="text-muted d-block">Population</small>
                      <strong className="text-brand-dark">{formattedPopulation}</strong>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                      <FaGlobe />
                    </div>
                    <div>
                      <small className="text-muted d-block">Region / Subregion</small>
                      <strong className="text-brand-dark">{region}</strong>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                      <FaLanguage />
                    </div>
                    <div>
                      <small className="text-muted d-block">Official Languages</small>
                      <strong className="text-brand-dark">{formattedLanguages}</strong>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                      <FaMoneyBillWave />
                    </div>
                    <div>
                      <small className="text-muted d-block">Currency</small>
                      <strong className="text-brand-dark">{formattedCurrencies}</strong>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-brand-light text-brand-primary p-3 rounded-circle fs-5">
                      <FaClock />
                    </div>
                    <div>
                      <small className="text-muted d-block">Timezone</small>
                      <strong className="text-brand-dark text-truncate d-block" style={{ maxWidth: '140px' }}>{formattedTimezones}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Actions */}
              <div className="d-flex flex-wrap gap-3 mt-4 pt-2">
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-brand-outline d-inline-flex align-items-center gap-2"
                >
                  <FaMapMarkerAlt />
                  <span>View on Google Maps</span>
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>

            {/* Travel Highlights */}
            <div className="glass-card p-4 p-md-5 shadow-sm">
              <h3 className="h4 font-serif text-brand-dark fw-bold mb-3">Included Luxury Services</h3>
              <div className="row g-3">
                <div className="col-md-6 d-flex gap-3 align-items-start">
                  <div className="bg-brand-primary text-white p-2 rounded-circle mt-1">✓</div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">Private Airport Transfers</h5>
                    <small className="text-muted">Chauffeur-driven luxury sedan upon arrival and departure.</small>
                  </div>
                </div>
                <div className="col-md-6 d-flex gap-3 align-items-start">
                  <div className="bg-brand-primary text-white p-2 rounded-circle mt-1">✓</div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">5-Star Boutique Stay</h5>
                    <small className="text-muted">Handpicked luxury hotels with complimentary breakfast and upgrades.</small>
                  </div>
                </div>
                <div className="col-md-6 d-flex gap-3 align-items-start">
                  <div className="bg-brand-primary text-white p-2 rounded-circle mt-1">✓</div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">Guided Excursions</h5>
                    <small className="text-muted">Skip-the-line museum passes and expert private local guide.</small>
                  </div>
                </div>
                <div className="col-md-6 d-flex gap-3 align-items-start">
                  <div className="bg-brand-primary text-white p-2 rounded-circle mt-1">✓</div>
                  <div>
                    <h5 className="h6 font-bold text-brand-dark mb-1">24/7 Concierge Hotline</h5>
                    <small className="text-muted">Personal travel advisor available via WhatsApp or direct call anytime.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="col-lg-4">
            <div className="card luxury-card p-4 sticky-top shadow-lg" style={{ top: '100px' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <span className="small text-muted d-block">Private Tour Packages</span>
                  <h3 className="h4 font-serif text-brand-dark mb-0 fw-bold">{pricePerNight || '$390'} <span className="fs-6 font-sans text-muted fw-normal">/ night</span></h3>
                </div>
                <span className="badge bg-brand-accent text-dark fw-bold">All-Inclusive</span>
              </div>

              <div className="p-3 bg-brand-light rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between small text-muted mb-2">
                  <span>Available Dates:</span>
                  <strong className="text-brand-dark">Year-Round Custom</strong>
                </div>
                <div className="d-flex align-items-center justify-content-between small text-muted mb-2">
                  <span>Duration:</span>
                  <strong className="text-brand-dark">5 - 14 Days Flexible</strong>
                </div>
                <div className="d-flex align-items-center justify-content-between small text-muted">
                  <span>Group Size:</span>
                  <strong className="text-brand-dark">Private (1-10 Guests)</strong>
                </div>
              </div>

              <button 
                className="btn btn-brand-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2 mb-3 shadow-md"
                onClick={() => onOpenBookingModal && onOpenBookingModal(commonName)}
              >
                <FaCalendarCheck />
                <span>Book This Destination</span>
              </button>

              <button 
                className="btn btn-brand-outline w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate('/contact')}
              >
                <FaPlaneDeparture />
                <span>Inquire Custom Itinerary</span>
              </button>

              <div className="text-center mt-3 pt-3 border-top border-light">
                <small className="text-muted d-flex align-items-center justify-content-center gap-1">
                  <FaShieldAlt className="text-brand-primary" /> Free Cancellation up to 14 days before arrival
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
