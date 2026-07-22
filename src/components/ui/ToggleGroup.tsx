import React from 'react';

interface ToggleGroupOption {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  value: string;
  onChange: (val: string) => void;
  options: ToggleGroupOption[];
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  value,
  onChange,
  options,
  className = ''
}) => {
  return (
    <div className={`inline-flex p-1 bg-zinc-900 border border-white/10 rounded-xl ${className}`}>
      {options.map(opt => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-outfit font-bold transition-all ${
              isActive
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
export default ToggleGroup;
