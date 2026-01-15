import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  label: string;
  onRemove?: () => void;
  color?: 'emerald' | 'zinc' | 'cyan' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  color = 'zinc',
  size = 'md',
  className = ''
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300',
    zinc: 'bg-zinc-800 border-zinc-700 text-zinc-300',
    cyan: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-300',
    purple: 'bg-purple-500/10 border-purple-500/25 text-purple-300'
  }[color];

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border font-mono font-medium ${sizeClass} ${colorClasses} ${className}`}>
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-white p-0.5 rounded transition cursor-pointer"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
export default Tag;
