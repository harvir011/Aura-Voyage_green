import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import Loader from '../components/Loader';
import { fetchAllCountries } from '../services/countriesApi';
import { FaGlobe, FaSortAmountDown, FaRedo } from 'react-icons/fa';

const Destinations = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [visibleCount, setVisibleCount] = useState(12);

  const location = useLocation();

  // Read URL query parameters if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const regionParam = params.get('region');
    if (searchParam) setSearchTerm(searchParam);
    if (regionParam) setSelectedRegion(regionParam);
  }, [location.search]);

  // Fetch countries
  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      const data = await fetchAllCountries();
      setCountries(data);
      setLoading(false);
    };
    getCountries();
  }, []);

  // Filter & Sort Logic
  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const countryName = country.name?.common?.toLowerCase() || '';
        const capitalName = Array.isArray(country.capital) ? country.capital[0]?.toLowerCase() : '';
        const matchesSearch = 
          countryName.includes(searchTerm.toLowerCase()) || 
          capitalName.includes(searchTerm.toLowerCase());

        const matchesRegion = selectedRegion 
          ? country.region?.toLowerCase() === selectedRegion.toLowerCase()
          : true;

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortBy === 'population') {
          return (b.population || 0) - (a.population || 0);
        }
        return (a.name?.common || '').localeCompare(b.name?.common || '');
      });
  }, [countries, searchTerm, selectedRegion, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSortBy('name');
    setVisibleCount(12);
  };

  return (
    <div className="destinations-page py-5 bg-brand-light min-vh-100">
      <div className="container py-4">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <span className="badge badge-pill-brand mb-2">Global Directory</span>
          <h1 className="display-4 font-serif text-brand-dark fw-bold mb-3">
            Explore All Destinations
          </h1>
          <p className="text-muted lead fs-5">
            Filter through world countries, discover rich cultural capitals, and plan your luxury journey.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-card p-4 mb-5 shadow-sm">
          <div className="row g-3 align-items-center">
            {/* Search Bar */}
            <div className="col-lg-6">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={(term) => {
                  setSearchTerm(term);
                  setVisibleCount(12);
                }} 
                placeholder="Search country or capital..."
              />
            </div>

            {/* Sort Dropdown */}
            <div className="col-lg-3 col-md-6 ms-auto">
              <div className="d-flex align-items-center gap-2">
                <FaSortAmountDown className="text-brand-primary" />
                <select
                  className="form-select border-brand-primary border-opacity-25 rounded-pill py-2 shadow-none text-brand-dark font-medium"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort destinations"
                >
                  <option value="name">Sort by Name (A-Z)</option>
                  <option value="population">Sort by Population (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Region Filters */}
          <div className="mt-4 pt-3 border-top border-light">
            <RegionFilter 
              selectedRegion={selectedRegion} 
              setSelectedRegion={(region) => {
                setSelectedRegion(region);
                setVisibleCount(12);
              }} 
            />
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4 pb-2 border-bottom border-light">
          <div className="d-flex align-items-center gap-2 text-brand-dark fw-semibold">
            <FaGlobe className="text-brand-primary" />
            <span>Showing {Math.min(filteredCountries.length, visibleCount)} of {filteredCountries.length} Destinations</span>
            {selectedRegion && <span className="badge bg-brand-primary text-white ms-2">{selectedRegion}</span>}
          </div>

          {(searchTerm || selectedRegion || sortBy !== 'name') && (
            <button 
              onClick={handleResetFilters} 
              className="btn btn-link text-brand-primary text-decoration-none small d-flex align-items-center gap-1 p-0 mt-2 mt-sm-0"
            >
              <FaRedo size={12} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Content Section */}
        {loading ? (
          <Loader text="Loading global destinations..." />
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-5 glass-card my-4">
            <div className="bg-brand-light text-brand-primary rounded-circle d-inline-flex p-4 mb-3 fs-1">
              <FaGlobe />
            </div>
            <h3 className="h4 font-serif text-brand-dark mb-2">No Destinations Found</h3>
            <p className="text-muted max-w-md mx-auto mb-4" style={{ maxWidth: '450px' }}>
              We couldn't find any country matching "{searchTerm}" {selectedRegion && `in ${selectedRegion}`}. Try adjusting your search query or reset filters.
            </p>
            <button onClick={handleResetFilters} className="btn btn-brand-primary px-4">
              Clear Search Filters
            </button>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {filteredCountries.slice(0, visibleCount).map((country) => (
                <DestinationCard key={country.cca3 || country.name?.common} country={country} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredCountries.length && (
              <div className="text-center mt-5">
                <button
                  className="btn btn-brand-outline px-5 py-3 rounded-pill fw-bold shadow-sm"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                >
                  Load More Destinations ({filteredCountries.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Destinations;
