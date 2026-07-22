import React from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end" onClick={onClose}>
      <div
        className={`w-full max-w-md h-full bg-[#090b14] border-l border-white/10 p-6 flex flex-col justify-between text-white shadow-2xl transition-transform ${
          position === 'left' ? 'self-start border-r' : 'self-end'
        } ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-outfit font-black text-lg">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">{children}</div>
      </div>
    </div>
  );
};
export default Drawer;
