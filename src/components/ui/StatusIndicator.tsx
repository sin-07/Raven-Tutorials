import React from 'react';

interface StatusIndicatorProps {
  status: 'active' | 'pending' | 'inactive';
  label?: string;
  pulse?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  pulse = true,
  className = ''
}) => {
  const statusColor = {
    active: 'bg-emerald-400 ring-emerald-400/30',
    pending: 'bg-amber-400 ring-amber-400/30',
    inactive: 'bg-zinc-500 ring-zinc-500/30'
  }[status];

  return (
    <span className={`inline-flex items-center gap-2 text-xs font-space font-medium text-zinc-300 ${className}`}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor.split(' ')[0]}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${statusColor}`} />
      </span>
      {label && <span>{label}</span>}
    </span>
  );
};
export default StatusIndicator;
