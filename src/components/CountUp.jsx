import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CountUp = ({ end, duration = 2, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric target value (handling numbers like 120, 50000, 99.4)
    const numericStr = String(end).replace(/[^0-9.]/g, '');
    const targetValue = parseFloat(numericStr) || 0;
    const isFloat = String(end).includes('.');
    const decimalPlaces = isFloat ? (String(end).split('.')[1]?.length || 1) : 0;

    let startTime = null;
    let animationFrame = null;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease-out quad formula
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetValue * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration]);

  const isFloat = String(end).includes('.');
  const formattedNumber = isFloat 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};

export default CountUp;
