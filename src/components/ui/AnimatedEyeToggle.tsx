'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedEyeToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
  size?: number;
}

export const AnimatedEyeToggle: React.FC<AnimatedEyeToggleProps> = ({
  isVisible,
  onToggle,
  className = '',
  size = 19,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      tabIndex={-1}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      className={`group relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none select-none ${
        isVisible
          ? 'bg-[#ff6a3d]/15 border border-[#ff6a3d]/40 text-[#ff7a45] shadow-[0_0_15px_rgba(232,96,46,0.3)]'
          : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white'
      } ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Outer Eye Contour (Eyelids) */}
        <motion.path
          d="M2 12C3.8 7.5 7.5 4.5 12 4.5C16.5 4.5 20.2 7.5 22 12C20.2 16.5 16.5 19.5 12 19.5C7.5 19.5 3.8 16.5 2 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            scaleY: isVisible ? 1 : 0.85,
            opacity: isVisible ? 1 : 0.65,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        />

        {/* Iris & Pupil Group */}
        <motion.g
          animate={{
            scale: isVisible ? 1 : 0,
            opacity: isVisible ? 1 : 0,
            x: isHovered && isVisible ? [0, 1.2, -1.2, 0] : 0,
          }}
          transition={{
            scale: { type: 'spring', stiffness: 400, damping: 22 },
            opacity: { duration: 0.15 },
            x: { duration: 1.2, repeat: isHovered ? Infinity : 0, repeatType: 'reverse' },
          }}
        >
          {/* Iris Ring */}
          <circle
            cx="12"
            cy="12"
            r="4.2"
            stroke="currentColor"
            strokeWidth="1.5"
            fill={isVisible ? 'rgba(232, 96, 46, 0.25)' : 'transparent'}
          />

          {/* Pupil Center */}
          <circle
            cx="12"
            cy="12"
            r="2.3"
            fill="currentColor"
          />

          {/* Catchlight Glint (Sparkle reflection) */}
          <circle
            cx="13.2"
            cy="10.8"
            r="0.8"
            fill="#ffffff"
          />
        </motion.g>

        {/* Closed Eye Eyelash / Sleep Arc (Visible when closed) */}
        <motion.path
          d="M7 13.5C8.5 15.5 10.2 16.2 12 16.2C13.8 16.2 15.5 15.5 17 13.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          animate={{
            opacity: !isVisible ? 0.65 : 0,
            scaleY: !isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Diagonal Slash Strike-Through (Smooth path draw) */}
        <motion.line
          x1="3.5"
          y1="3.5"
          x2="20.5"
          y2="20.5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          initial={false}
          animate={{
            pathLength: !isVisible ? 1 : 0,
            opacity: !isVisible ? 1 : 0,
          }}
          transition={{
            pathLength: { type: 'spring', stiffness: 400, damping: 28 },
            opacity: { duration: 0.15 },
          }}
        />
      </svg>

      {/* Ambient Glow Aura when Active */}
      {isVisible && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none bg-[#ff7a45]/20 blur-md -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.25 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedEyeToggle;
