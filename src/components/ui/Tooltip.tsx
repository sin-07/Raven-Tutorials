'use client';
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#121422] border border-white/10 text-xs text-white rounded-lg whitespace-nowrap shadow-xl z-50 pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
