import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md' 
}) => (
  <div 
    className={`bg-[#f0fdf4] rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] text-black ${paddingClasses[padding]} ${className}`}
  >
    {children}
  </div>
);

export default Card;
