import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  variant?: 'ghost' | 'emerald' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeMap = {
    sm: 'p-1.5 rounded-lg',
    md: 'p-2 rounded-xl',
    lg: 'p-3 rounded-2xl'
  }[size];

  const variantMap = {
    ghost: 'text-zinc-400 hover:text-white hover:bg-white/10',
    emerald: 'bg-emerald-500 text-white shadow-sm hover:bg-emerald-400',
    subtle: 'bg-zinc-800 text-zinc-300 hover:text-white border border-white/10'
  }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center transition cursor-pointer ${sizeMap} ${variantMap} ${className}`}
      {...props}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};
export default IconButton;
