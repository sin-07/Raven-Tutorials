'use client';

import React, { useState, useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedEyeToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
  size?: number;
}

// 24 mathematically arranged biological iris trabeculae (striae fibers)
const IRIS_STRIAE = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i * 360) / 24;
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const innerR = 3.0 + (i % 3 === 0 ? 0.35 : 0);
  const outerR = 5.8 + (i % 2 === 0 ? 0.4 : -0.2);
  return {
    id: i,
    x1: 16 + innerR * cos,
    y1: 16 + innerR * sin,
    x2: 16 + outerR * cos,
    y2: 16 + outerR * sin,
    opacity: i % 3 === 0 ? 0.7 : i % 2 === 0 ? 0.45 : 0.28,
    strokeWidth: i % 4 === 0 ? 0.65 : 0.4,
    color: i % 3 === 0 ? '#fef08a' : i % 2 === 0 ? '#fed7aa' : '#fb923c',
  };
});

export const AnimatedEyeToggle: React.FC<AnimatedEyeToggleProps> = ({
  isVisible,
  onToggle,
  className = '',
  size = 25,
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const [isHovered, setIsHovered] = useState(false);
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [microGaze, setMicroGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Spontaneous human blinking cycle (every 3.5s - 6.5s, with natural double-blinks)
  useEffect(() => {
    if (!isVisible) return;
    let timeoutId: NodeJS.Timeout;

    const scheduleBlink = () => {
      const delay = 3500 + Math.random() * 2800;
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
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

  // Subtle biological micro-saccades (imperceptible living drifts)
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      if (!isHovered) {
        setMicroGaze({
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.5,
        });
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [isVisible, isHovered]);

  // Interactive cursor gaze tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !isVisible) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Anatomically constrained range (±2.2px horizontal, ±1.6px vertical)
    setGaze({
      x: Math.max(-2.2, Math.min(2.2, deltaX * 2.2)),
      y: Math.max(-1.6, Math.min(1.6, deltaY * 1.6)),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGaze({ x: 0, y: 0 });
  };

  const isEyeOpen = isVisible && !isBlinking;

  // Active gaze coordinate combining mouse position and idling micro-saccades
  const activeGazeX = isEyeOpen ? gaze.x + (isHovered ? 0 : microGaze.x) : 0;
  const activeGazeY = isEyeOpen ? gaze.y + (isHovered ? 0 : microGaze.y) : 1.6;

  // 3D Cornea Parallax: Specular highlight is anchored to room light and moves only 18%
  const specularGazeX = activeGazeX * 0.18;
  const specularGazeY = activeGazeY * 0.18;

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      tabIndex={-1}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      title={isVisible ? 'Hide password' : 'Show password'}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 cursor-pointer focus:outline-none select-none ${
        isVisible
          ? 'bg-[#121524]/90 border border-white/20 shadow-[0_0_20px_rgba(232,96,46,0.25)]'
          : 'bg-[#0e111d]/85 hover:bg-[#161a2b] border border-white/10 hover:border-white/20 shadow-md'
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
          {/* Feathered Limbal Ring Blur (soft biological transition from cornea to sclera) */}
          <filter id={`limbus-blur-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>

          {/* Soft Shadow Filter for Eyelid Depth */}
          <filter id={`soft-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Anatomical Eye Opening Contour (Palpebral Fissure) Clip Path */}
          <clipPath id={`sclera-clip-${id}`}>
            <motion.path
              animate={{
                d: isEyeOpen
                  ? 'M 3.0 16.5 C 6.8 8.0, 13.0 5.8, 16.0 5.8 C 20.8 5.8, 25.5 8.8, 29.0 15.2 C 25.5 22.8, 20.8 24.8, 16.0 24.8 C 11.2 24.8, 6.8 22.8, 3.0 16.5 Z'
                  : 'M 3.0 16.5 C 6.8 17.5, 13.0 19.2, 16.0 19.2 C 20.8 19.2, 25.5 18.0, 29.0 15.2 C 25.5 18.2, 20.8 19.5, 16.0 19.5 C 11.2 19.5, 6.8 18.2, 3.0 16.5 Z',
              }}
              transition={{
                type: 'spring',
                stiffness: isBlinking ? 620 : 380,
                damping: isBlinking ? 20 : 25,
              }}
            />
          </clipPath>

          {/* Photorealistic Multi-Tone Amber/Hazel Radial Gradient */}
          <radialGradient id={`iris-grad-${id}`} cx="46%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="14%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="82%" stopColor="#92400e" />
            <stop offset="94%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c0d02" />
          </radialGradient>

          {/* 3D Spherical Eyeball Depth Gradient */}
          <radialGradient id={`sclera-depth-${id}`} cx="50%" cy="50%" r="52%">
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="82%" stopColor="#cbd5e1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.75" />
          </radialGradient>

          {/* Upper Eyelid Deep Anatomical Cast Shadow */}
          <linearGradient id={`upper-cast-shadow-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030712" stopOpacity="0.7" />
            <stop offset="42%" stopColor="#030712" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </linearGradient>

          {/* Inner Tear Duct (Lacrimal Caruncle) Flesh Gradient */}
          <linearGradient id={`caruncle-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* ══ 1. SCLERA, CAPILLARIES, TEAR DUCT, IRIS & PUPIL (Bounded by Eye Contour) ══ */}
        <g clipPath={`url(#sclera-clip-${id})`}>
          {/* Eyeball Sclera base (Warm biological off-white) */}
          <rect x="0" y="0" width="32" height="32" fill="#f1f5f9" />

          {/* 3D Eyeball Spherical Vignette (Volume depth) */}
          <rect x="0" y="0" width="32" height="32" fill={`url(#sclera-depth-${id})`} />

          {/* Delicate Branching Sclera Capillaries in Temporal Corner */}
          <path
            d="M 29.0 15.2 C 27.2 14.8, 25.5 14.2, 23.5 14.5 C 22.5 14.2, 21.6 14.6, 20.8 14.4"
            stroke="rgba(225, 29, 72, 0.32)"
            strokeWidth="0.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 25.2 14.2 C 24.4 13.5, 23.6 13.2, 22.8 13.4"
            stroke="rgba(225, 29, 72, 0.25)"
            strokeWidth="0.32"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 28.5 15.8 C 26.8 16.5, 25.0 17.0, 23.2 16.6"
            stroke="rgba(225, 29, 72, 0.25)"
            strokeWidth="0.35"
            strokeLinecap="round"
            fill="none"
          />

          {/* Inner Tear Duct (Medial Canthus / Lacrimal Caruncle) */}
          <path
            d="M 3.0 16.5 C 4.0 15.0, 5.6 15.2, 6.2 16.8 C 5.6 17.8, 4.0 18.0, 3.0 16.5 Z"
            fill={`url(#caruncle-grad-${id})`}
            opacity="0.88"
          />
          {/* Lacrimal Lake Wet Tear Meniscus Glint */}
          <circle cx="4.6" cy="16.5" r="0.6" fill="#ffffff" opacity="0.8" />

          {/* IRIS & PUPIL MOTION GROUP (Gaze tracking & light reflex) */}
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
            {/* Feathered Limbal Ring (Soft biological corneoscleral junction) */}
            <circle
              cx="16"
              cy="16"
              r="6.8"
              fill="#1c0d02"
              opacity="0.9"
              filter={`url(#limbus-blur-${id})`}
            />

            {/* Iris Colored Core */}
            <circle cx="16" cy="16" r="6.3" fill={`url(#iris-grad-${id})`} />

            {/* 24 Biological Iris Trabeculae (Radial striae fibers) */}
            {IRIS_STRIAE.map((spoke) => (
              <line
                key={spoke.id}
                x1={spoke.x1}
                y1={spoke.y1}
                x2={spoke.x2}
                y2={spoke.y2}
                stroke={spoke.color}
                strokeWidth={spoke.strokeWidth}
                opacity={spoke.opacity}
                strokeLinecap="round"
              />
            ))}

            {/* Iris Collarette (Zigzag crypts ring) */}
            <circle
              cx="16"
              cy="16"
              r="3.8"
              stroke="#fef08a"
              strokeWidth="0.5"
              strokeDasharray="1.2 1.4"
              fill="none"
              opacity="0.75"
            />

            {/* Pupillary Ruff (Dark velvety border around pupil) */}
            <circle cx="16" cy="16" r="3.2" fill="#140a02" opacity="0.6" />

            {/* PUPIL (Velvet true black with biological pupillary light reflex) */}
            <motion.circle
              cx="16"
              cy="16"
              animate={{
                r: isEyeOpen ? (isHovered ? 3.4 : 2.8) : 1.7,
              }}
              transition={{
                type: 'spring',
                stiffness: 330,
                damping: 20,
              }}
              fill="#030407"
            />
          </motion.g>

          {/* ══ 2. 3D CORNEA PARALLAX SPECULAR CATCHLIGHTS ══ */}
          {/* Studio softbox / curved window reflection stays anchored to room light */}
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
            {/* Primary Curved Softbox Window Catchlight */}
            <path
              d="M 13.5 12.6 C 14.3 12.0, 15.6 12.0, 16.4 12.5 C 16.0 13.6, 14.8 14.2, 13.6 14.0 Z"
              fill="#ffffff"
              opacity="0.95"
            />

            {/* Crisp Point Glint Specular Core */}
            <circle cx="14.3" cy="13.2" r="0.8" fill="#ffffff" />

            {/* Secondary Ambient Room Fill Reflection */}
            <circle cx="17.8" cy="17.6" r="0.65" fill="#ffffff" opacity="0.55" />
          </motion.g>

          {/* Moist Lower Eyelid Waterline Sheen */}
          <path
            d="M 6.5 18.0 C 10.5 22.8, 21.5 22.8, 25.5 17.2"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="0.5"
            fill="none"
          />

          {/* Upper Eyelid Deep Cast Shadow (Spherical eye occlusion) */}
          <rect x="0" y="0" width="32" height="13" fill={`url(#upper-cast-shadow-${id})`} />
        </g>

        {/* ══ 3. ANATOMICAL WATERLINE, CREASE & NATURAL EYELASHES ══ */}

        {/* Lower Eyelid Mucosal Waterline (Realistic fleshy ledge) */}
        <path
          d="M 3.8 16.8 C 7.2 22.5, 21.0 22.5, 28.2 15.8"
          stroke="rgba(244, 114, 182, 0.28)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Supratarsal Eyelid Crease (Lifts when open, relaxes when closed) */}
        <motion.path
          d="M 4.2 11.0 C 9.0 5.6, 22.0 5.6, 27.2 11.0"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
          animate={{
            y: isEyeOpen ? 0 : 3.8,
            opacity: isEyeOpen ? 0.75 : 0.2,
          }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 25,
          }}
        />

        {/* Upper Eyelid Margin (Natural dark lash line, NOT a neon cartoon border) */}
        <motion.path
          d={
            isEyeOpen
              ? 'M 3.0 16.5 C 6.8 8.0, 13.0 5.8, 16.0 5.8 C 20.8 5.8, 25.5 8.8, 29.0 15.2'
              : 'M 3.0 16.5 C 6.8 17.5, 13.0 19.2, 16.0 19.2 C 20.8 19.2, 25.5 18.0, 29.0 15.2'
          }
          stroke="#090d16"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d={
            isEyeOpen
              ? 'M 3.0 16.5 C 6.8 8.0, 13.0 5.8, 16.0 5.8 C 20.8 5.8, 25.5 8.8, 29.0 15.2'
              : 'M 3.0 16.5 C 6.8 17.5, 13.0 19.2, 16.0 19.2 C 20.8 19.2, 25.5 18.0, 29.0 15.2'
          }
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* 8 Natural Curved Upper Eyelashes when Open */}
        <AnimatePresence>
          {isEyeOpen && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <path d="M 6.8 13.5 C 5.8 11.5, 5.0 10.5, 3.8 10.0" stroke="#f1f5f9" strokeWidth="0.7" strokeLinecap="round" />
              <path d="M 9.5 10.2 C 8.6 8.2, 7.8 7.0, 6.5 6.2" stroke="#f1f5f9" strokeWidth="0.75" strokeLinecap="round" />
              <path d="M 12.5 7.8 C 12.0 5.5, 11.0 4.2, 9.8 3.5" stroke="#f1f5f9" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 15.5 6.2 C 15.4 3.8, 15.2 2.5, 15.0 1.5" stroke="#f1f5f9" strokeWidth="0.85" strokeLinecap="round" />
              <path d="M 17.5 6.4 C 18.0 3.8, 18.5 2.5, 19.0 1.8" stroke="#f1f5f9" strokeWidth="0.85" strokeLinecap="round" />
              <path d="M 20.5 7.8 C 21.5 5.5, 22.5 4.2, 24.0 3.5" stroke="#f1f5f9" strokeWidth="0.8" strokeLinecap="round" />
              <path d="M 23.5 10.2 C 25.0 8.2, 26.5 7.0, 28.2 6.5" stroke="#f1f5f9" strokeWidth="0.75" strokeLinecap="round" />
              <path d="M 26.2 13.2 C 28.0 11.5, 29.5 10.5, 31.0 10.0" stroke="#f1f5f9" strokeWidth="0.7" strokeLinecap="round" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ══ 4. CLOSED STATE: NATURAL DOWNWARD RESTING EYELASHES ══ */}
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
                d="M 3.0 16.5 C 8.0 20.6, 23.0 20.6, 29.0 15.2"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />

              {/* 7 Natural Downward Curved Resting Eyelashes */}
              <path d="M 7.0 18.4 C 6.2 20.8, 5.0 22.8, 3.8 24.0" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 10.0 19.5 C 9.5 22.2, 8.5 24.5, 7.2 25.8" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 13.5 20.2 C 13.2 23.2, 12.5 25.8, 11.5 27.0" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 16.0 20.5 C 16.0 23.8, 16.0 26.5, 16.0 27.8" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 18.5 20.2 C 18.8 23.2, 19.5 25.8, 20.5 27.0" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 22.0 19.5 C 22.5 22.2, 23.5 24.5, 24.8 25.8" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M 25.0 18.4 C 25.8 20.8, 27.0 22.8, 28.2 24.0" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Subtle Warm Ambient Glow Aura when Eye is Open */}
      {isEyeOpen && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none bg-[#ff7a45]/20 blur-md -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.25 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedEyeToggle;
