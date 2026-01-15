'use client';
import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-4 h-4', translate: 'translate-x-5' }
  }[size];

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex items-center p-0.5 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${sizeMap.track} ${
          checked ? 'bg-emerald-500' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${sizeMap.thumb} ${
            checked ? sizeMap.translate : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-xs font-jakarta font-medium text-zinc-300">{label}</span>}
    </label>
  );
};
export default Switch;
