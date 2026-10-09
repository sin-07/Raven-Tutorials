import React from 'react';

interface DividerProps {
  className?: string;
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ className = '', label }) => {
  if (!label) {
    return <hr className={`border-t border-white/10 my-6 ${className}`} />;
  }
  return (
    <div className={`relative flex py-4 items-center ${className}`}>
      <div className="flex-grow border-t border-white/10" />
      <span className="flex-shrink mx-4 text-xs uppercase font-space font-semibold text-zinc-500">{label}</span>
      <div className="flex-grow border-t border-white/10" />
    </div>
  );
};
export default Divider;
