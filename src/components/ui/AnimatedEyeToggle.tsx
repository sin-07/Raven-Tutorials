'use client';

import React, { useState, useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedEyeToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
  size?: number;
}

// Precomputed 16 radial iris striae (spoke fibers) radiating from pupil to outer iris
const IRIS_STRIAE = Array.from({ length: 16 }).map((_, i) => {
  const angle = (i * 360) / 16;
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    id: i,
    x1: 16 + 3.1 * cos,
    y1: 16 + 3.1 * sin,
    x2: 16 + 5.9 * cos,
    y2: 16 + 5.9 * sin,
    opacity: i % 2 === 0 ? 0.6 : 0.35,
    strokeWidth: i % 3 === 0 ? 0.65 : 0.45,
  };
});

export const AnimatedEyeToggle: React.FC<AnimatedEyeToggleProps> = ({
  isVisible,
  onToggle,
  className = '',
  size = 21,
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const [isHovered, setIsHovered] = useState(false);
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [microGaze, setMicroGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Natural spontaneous human blinking with occasional double-blinks
  useEffect(() => {
    if (!isVisible) return;
    let timeoutId: NodeJS.Timeout;

    const scheduleBlink = () => {
      const delay = 3600 + Math.random() * 2800; // 3.6s to 6.4s idle interval
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          // 12% probability of a lifelike quick double-blink
          if (Math.random() < 0.12) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleBlink();
              }, 110);
            }, 120);
          } else {
            scheduleBlink();
          }
        }, 130);
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  // Subtle living micro-saccades when idling (imperceptible organic eye drifts)
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      if (!isHovered) {
        setMicroGaze({
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.5,
        });
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isVisible, isHovered]);

  // Realistic gaze tracking on cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !isVisible) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Anatomical range limits (±2.1px horizontal, ±1.6px vertical)
    setGaze({
      x: Math.max(-2.1, Math.min(2.1, deltaX * 2.1)),
      y: Math.max(-1.6, Math.min(1.6, deltaY * 1.6)),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGaze({ x: 0, y: 0 });
  };

  const isEyeOpen = isVisible && !isBlinking;

  // Active gaze position combining mouse hover tracking and idle micro-saccades
  const activeGazeX = isEyeOpen ? gaze.x + (isHovered ? 0 : microGaze.x) : 0;
  const activeGazeY = isEyeOpen ? gaze.y + (isHovered ? 0 : microGaze.y) : 1.6;

  // Optical parallax: Cornea highlight stays almost fixed relative to external light source!
  const specularGazeX = activeGazeX * 0.22;
  const specularGazeY = activeGazeY * 0.22;

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.92 }}
      tabIndex={-1}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      title={isVisible ? 'Hide password' : 'Show password'}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 cursor-pointer focus:outline-none select-none ${
        isVisible
          ? 'bg-[#15121b]/90 border border-[#ff7a45]/40 shadow-[0_0_20px_rgba(232,96,46,0.3)]'
          : 'bg-[#0f121d]/85 hover:bg-[#161a2b] border border-white/10 hover:border-white/20 shadow-md'
      } ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Anatomical Palpebral Fissure (Eye Opening) Clip Path */}
          <clipPath id={`sclera-clip-${id}`}>
            <motion.path
              animate={{
                d: isEyeOpen
                  ? 'M 3.5 16.5 C 7 8.5, 13 6.4, 16 6.4 C 20.5 6.4, 25 9.2, 28.5 15.5 C 25 22.5, 20.5 24.6, 16 24.6 C 11.5 24.6, 7 22.5, 3.5 16.5 Z'
                  : 'M 3.5 16.5 C 7 17.5, 13 18.8, 16 18.8 C 20.5 18.8, 25 17.8, 28.5 15.5 C 25 18.2, 20.5 19.2, 16 19.2 C 11.5 19.2, 7 18.2, 3.5 16.5 Z',
              }}
              transition={{
                type: 'spring',
                stiffness: isBlinking ? 620 : 390,
                damping: isBlinking ? 20 : 25,
              }}
            />
          </clipPath>

          {/* Hyper-realistic Multi-Tone Iris Radial Gradient with Amber/Hazel Depth */}
          <radialGradient id={`iris-grad-${id}`} cx="46%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="18%" stopColor="#fde047" />
            <stop offset="42%" stopColor="#f59e0b" />
            <stop offset="68%" stopColor="#ea580c" />
            <stop offset="88%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#260f06" />
          </radialGradient>

          {/* Sclera 3D Spherical Ambient Vignette */}
          <radialGradient id={`sclera-sphere-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.6" />
          </radialGradient>

          {/* Anatomical Upper Eyelid Cast Shadow on Sclera & Iris */}
          <linearGradient id={`upper-shadow-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090d16" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#090d16" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
          </linearGradient>

          {/* Tear Duct Flesh Gradient */}
          <linearGradient id={`tear-duct-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* ══ 1. SCLERA, VEINS, TEAR DUCT, IRIS & PUPIL (Bounded by Eye Clip) ══ */}
        <g clipPath={`url(#sclera-clip-${id})`}>
          {/* Sclera base (Warm biological ivory) */}
          <rect x="0" y="0" width="32" height="32" fill="#f1f5f9" />

          {/* 3D Eyeball Spherical Vignette */}
          <rect x="0" y="0" width="32" height="32" fill={`url(#sclera-sphere-${id})`} />

          {/* Delicate sclera micro-capillaries in outer lateral corner */}
          <path
            d="M 28.5 15.5 C 26.8 15.2, 25.4 14.5, 23.6 14.8"
            stroke="rgba(225, 29, 72, 0.28)"
            strokeWidth="0.45"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 28 16.2 C 26.5 16.6, 25.2 17.2, 23.8 16.9"
            stroke="rgba(225, 29, 72, 0.22)"
            strokeWidth="0.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Medial Canthus Tear Duct (Lacrimal caruncle) */}
          <path
            d="M 3.5 16.5 C 4.4 15.2, 5.8 15.5, 6.3 16.8 C 5.8 17.8, 4.4 17.8, 3.5 16.5 Z"
            fill={`url(#tear-duct-grad-${id})`}
            opacity="0.8"
          />
          {/* Tear film moist reflection glint */}
          <circle cx="4.8" cy="16.5" r="0.55" fill="#ffffff" opacity="0.75" />

          {/* IRIS & PUPIL GROUP (Responds with gaze tracking & spring dilation) */}
          <motion.g
            animate={{
              x: activeGazeX,
              y: activeGazeY,
              scale: isEyeOpen ? 1 : 0.82,
            }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 24,
            }}
          >
            {/* Outer Limbal Ring (Deep anatomical corneoscleral junction) */}
            <circle cx="16" cy="16" r="6.6" fill="#201107" opacity="0.95" />

            {/* Iris Colored Core */}
            <circle cx="16" cy="16" r="6.2" fill={`url(#iris-grad-${id})`} />

            {/* Iris Radial Striae (Spoke fibers for biological texture) */}
            {IRIS_STRIAE.map((spoke) => (
              <line
                key={spoke.id}
                x1={spoke.x1}
                y1={spoke.y1}
                x2={spoke.x2}
                y2={spoke.y2}
                stroke="#fed7aa"
                strokeWidth={spoke.strokeWidth}
                opacity={spoke.opacity}
                strokeLinecap="round"
              />
            ))}

            {/* Iris Collarette (Undulating circular ring boundary) */}
            <circle
              cx="16"
              cy="16"
              r="3.8"
              stroke="#fbbf24"
              strokeWidth="0.55"
              strokeDasharray="1.2 1.2"
              fill="none"
              opacity="0.65"
            />

            {/* PUPIL (Velvet pitch black with biological pupillary light reflex) */}
            <motion.circle
              cx="16"
              cy="16"
              animate={{
                r: isEyeOpen ? (isHovered ? 3.4 : 2.9) : 1.8,
              }}
              transition={{
                type: 'spring',
                stiffness: 330,
                damping: 21,
              }}
              fill="#05060a"
            />
          </motion.g>

          {/* ══ 3D CORNEA PARALLAX SPECULAR HIGHLIGHTS ══ */}
          {/* Anchored to environmental room light with minimal parallax drift */}
          <motion.g
            animate={{
              x: specularGazeX,
              y: specularGazeY,
            }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 24,
            }}
          >
            {/* Primary Corneal Specular Glint (Glossy bright curved reflection) */}
            <ellipse
              cx="14.4"
              cy="13.8"
              rx="1.25"
              ry="0.95"
              transform="rotate(-20 14.4 13.8)"
              fill="#ffffff"
              opacity="0.96"
            />

            {/* Secondary Ambient Fill Reflection (Adds glass transparency feel) */}
            <circle cx="17.7" cy="17.6" r="0.65" fill="#ffffff" opacity="0.6" />
          </motion.g>

          {/* Lower Eyelid Moist Waterline Shimmer */}
          <path
            d="M 5.8 17.6 C 9.5 22.8, 22.5 22.8, 26.2 16.8"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="0.6"
            fill="none"
          />

          {/* Anatomical Upper Eyelid Biological Cast Shadow */}
          <rect x="0" y="0" width="32" height="13" fill={`url(#upper-shadow-${id})`} />
        </g>

        {/* ══ 2. ANATOMICAL EYELID CONTOUR, CREASE & EYELASHES ══ */}

        {/* Supratarsal Eyelid Crease (Lifts when open, relaxes down when shut) */}
        <motion.path
          d="M 4.5 11.2 C 9 6, 22.5 6, 27 11.2"
          stroke="rgba(255, 255, 255, 0.24)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={{
            y: isEyeOpen ? 0 : 3.8,
            opacity: isEyeOpen ? 0.75 : 0.25,
          }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 25,
          }}
        />

        {/* Outer Eye Almond Rim (Stroke contour) */}
        <motion.path
          d={
            isEyeOpen
              ? 'M 3.5 16.5 C 7 8.5, 13 6.4, 16 6.4 C 20.5 6.4, 25 9.2, 28.5 15.5 C 25 22.5, 20.5 24.6, 16 24.6 C 11.5 24.6, 7 22.5, 3.5 16.5 Z'
              : 'M 3.5 16.5 C 7 17.5, 13 18.8, 16 18.8 C 20.5 18.8, 25 17.8, 28.5 15.5 C 25 18.2, 20.5 19.2, 16 19.2 C 11.5 19.2, 7 18.2, 3.5 16.5 Z'
          }
          stroke={isEyeOpen ? '#ff7a45' : 'rgba(255, 255, 255, 0.45)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{
            stroke: isEyeOpen ? '#ff7a45' : 'rgba(255, 255, 255, 0.45)',
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Natural Upper Eyelashes when Open */}
        <AnimatePresence>
          {isEyeOpen && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.78 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <path
                d="M 7.8 12.6 C 6.8 10.8, 5.8 9.8, 4.2 9.4"
                stroke="#f8fafc"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
              <path
                d="M 11.6 8.8 C 11 7, 10.2 5.5, 9 4.8"
                stroke="#f8fafc"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M 16 6.8 C 16 5, 15.8 3.8, 15.4 3"
                stroke="#f8fafc"
                strokeWidth="0.85"
                strokeLinecap="round"
              />
              <path
                d="M 20.4 8.6 C 21.2 6.8, 22.2 5.5, 23.4 4.8"
                stroke="#f8fafc"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M 24.6 12 C 25.8 10.5, 27 9.8, 28.4 9.2"
                stroke="#f8fafc"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ══ 3. REALISTIC CLOSED EYELID & DOWNWARD RESTING EYELASHES ══ */}
        <AnimatePresence>
          {!isEyeOpen && (
            <motion.g
              initial={{ opacity: 0, scaleY: 0.7 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.7 }}
              transition={{ duration: 0.16 }}
            >
              {/* Natural Closed Eyelid Seam Margin */}
              <path
                d="M 3.5 16.5 C 8.5 20.4, 23.5 20.4, 28.5 15.5"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Downward Curved Natural Resting Eyelashes */}
              <path
                d="M 8.5 18.4 C 8 20.6, 7 22.2, 5.5 23.2"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M 12.2 19.4 C 12 21.8, 11.2 23.8, 10.2 25"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M 16 19.8 C 16 22.5, 16 24.5, 16 25.8"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M 19.8 19.4 C 20 21.8, 20.8 23.8, 21.8 25"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M 23.5 18.4 C 24 20.6, 25 22.2, 26.5 23.2"
                stroke="#ffffff"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Ambient Energetic Glow Aura when Eye is Open */}
      {isEyeOpen && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none bg-[#ff7a45]/20 blur-md -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.3 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedEyeToggle;
