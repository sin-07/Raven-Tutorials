import React from 'react';

export const Spinner: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <div
    className={`inline-block animate-spin rounded-full border-2 border-white/20 border-t-[#10b981] ${className}`}
    style={{ width: size, height: size }}
    aria-label="Loading"
  />
);
export default Spinner;
