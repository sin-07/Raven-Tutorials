'use client';
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden mb-3 bg-[#0e101a]">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left p-4 flex justify-between items-center text-sm font-outfit font-bold text-white hover:bg-white/5 transition`}
      >
        <span>{title}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <div className="p-4 pt-0 text-zinc-300 text-sm font-jakarta">{children}</div>}
    </div>
  );
};
export default Accordion;
