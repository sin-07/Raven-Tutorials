import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
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
  padding = 'md',
  hoverable = false,
}) => (
  <div 
    className={`bg-gradient-to-b from-[#10121d] to-[#0a0c14] rounded-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-white ${
      hoverable
        ? 'transition-all duration-300 hover:-translate-y-1.5 hover:border-[#10b981]/50 hover:shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(16,185,129,0.2)]'
        : ''
    } ${paddingClasses[padding]} ${className}`}
  >
    {children}
  </div>
);

export default Card;
