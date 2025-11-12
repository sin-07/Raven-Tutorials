import React from 'react';

interface DividerWithTextProps {
  text: string;
  className?: string;
}

export const DividerWithText: React.FC<DividerWithTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center my-4 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10" />
      </div>
      <div className="relative px-3 bg-[#090b14] text-zinc-500 text-[10px] font-space uppercase font-bold tracking-widest">
        {text}
      </div>
    </div>
  );
};
export default DividerWithText;
