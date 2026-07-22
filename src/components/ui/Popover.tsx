'use client';
import React, { useState, useRef } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ trigger, content, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute z-40 mt-2 p-3 bg-zinc-900 border border-white/15 rounded-2xl shadow-xl text-white text-xs">
          {content}
        </div>
      )}
    </div>
  );
};
export default Popover;
