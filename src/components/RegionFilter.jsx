import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas } from 'react-icons/fa';

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const RegionFilter = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
      <div className="d-none d-md-flex align-items-center gap-2 me-2 text-brand-secondary font-semibold small">
        <FaGlobeAmericas className="text-brand-primary" />
        <span>Filter by Region:</span>
      </div>
      {REGIONS.map((region) => {
        const isSelected = selectedRegion === (region === 'All' ? '' : region);
        return (
          <motion.button
            key={region}
            type="button"
            className={`btn btn-sm px-3 py-2 rounded-pill font-medium position-relative transition-all ${
              isSelected
                ? 'btn-brand-primary shadow-sm text-white'
                : 'btn-outline-secondary text-brand-dark bg-white border-opacity-25'
            }`}
            onClick={() => setSelectedRegion(region === 'All' ? '' : region)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="position-relative z-2">{region}</span>
            {isSelected && (
              <motion.div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-pill bg-brand-primary z-1"
                layoutId="activeRegionPill"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default RegionFilter;
