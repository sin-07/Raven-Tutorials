import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-[#0c0d16]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl ${className}`}>
    {children}
  </div>
);
export default Card;
