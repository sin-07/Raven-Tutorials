import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
}

export function Alert({ children, variant = 'info', title, className = '' }: AlertProps) {
  const variants = {
    info: 'bg-cyan-500/10 text-cyan-200 border-cyan-500/20',
    success: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-200 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-200 border-rose-500/20'
  };

  return (
    <div className={`p-4 rounded-xl border backdrop-blur-md ${variants[variant]} ${className}`}>
      {title && <h5 className="font-semibold text-sm mb-1">{title}</h5>}
      <div className="text-xs leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
