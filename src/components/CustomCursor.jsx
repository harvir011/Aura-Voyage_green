import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch/mobile device
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 992) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Event delegation to detect hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, select, textarea, .luxury-card, .btn, .interactive-hover');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Small Inner Dot */}
      <motion.div
        className="position-fixed rounded-circle bg-brand-accent pointer-events-none"
        style={{
          width: '8px',
          height: '8px',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(236, 243, 158, 0.8)'
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Larger Outer Ring */}
      <motion.div
        className="position-fixed rounded-circle border border-brand-accent pointer-events-none"
        style={{
          width: '36px',
          height: '36px',
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          backgroundColor: isHovered ? 'rgba(236, 243, 158, 0.15)' : 'transparent',
          backdropFilter: isHovered ? 'blur(2px)' : 'none'
        }}
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? '#ecf39e' : 'rgba(236, 243, 158, 0.6)'
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22, mass: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
