import React from 'react';
import { X } from 'lucide-react';
import { ModalBackdrop } from './ModalBackdrop';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = ''
}) => {
  return (
    <ModalBackdrop isOpen={isOpen} onClose={onClose}>
      <div className={`w-full max-w-lg bg-[#090b14] border border-white/15 rounded-3xl p-6 text-white shadow-2xl space-y-4 ${className}`}>
        <div className="flex justify-between items-start border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-outfit font-black">{title}</h3>
            {description && <p className="text-xs text-zinc-400 font-jakarta mt-0.5">{description}</p>}
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </ModalBackdrop>
  );
};
export default Dialog;
