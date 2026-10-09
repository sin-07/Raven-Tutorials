import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/5 rounded-2xl border border-white/5 ${className}`} />
);
export default Skeleton;
