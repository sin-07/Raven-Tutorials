import React from 'react';

export const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="px-2 py-1 text-[11px] font-space font-semibold text-zinc-300 bg-white/10 border border-white/15 rounded-md shadow-inner">
    {children}
  </kbd>
);
export default Kbd;
