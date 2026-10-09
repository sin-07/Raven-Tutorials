import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'rose';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = '',
}) => {
  const variants = {
    emerald: 'bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    blue: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-space font-bold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
export default Badge;
