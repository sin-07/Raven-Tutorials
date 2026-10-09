import React from 'react';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export const Alert: React.FC<AlertProps> = ({ title, children, type = 'info' }) => {
  const styles = {
    info: 'border-sky-500/30 bg-sky-950/20 text-sky-200',
    success: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200',
    warning: 'border-amber-500/30 bg-amber-950/20 text-amber-200',
    error: 'border-rose-500/30 bg-rose-950/20 text-rose-200',
  };
  return (
    <div className={`p-4 rounded-2xl border ${styles[type]} text-sm font-jakarta`}>
      {title && <h4 className="font-bold font-outfit mb-1">{title}</h4>}
      <div>{children}</div>
    </div>
  );
};
export default Alert;
