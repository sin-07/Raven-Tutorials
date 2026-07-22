import React from 'react';

interface NotificationBadgeProps {
  count?: number;
  dot?: boolean;
  color?: 'emerald' | 'rose' | 'amber';
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count = 0,
  dot = false,
  color = 'emerald',
  className = ''
}) => {
  if (!dot && count <= 0) return null;

  const colorMap = {
    emerald: 'bg-emerald-500 text-white',
    rose: 'bg-rose-500 text-white',
    amber: 'bg-amber-500 text-black'
  }[color];

  if (dot) {
    return <span className={`inline-block w-2 h-2 rounded-full ring-2 ring-[#050507] ${colorMap} ${className}`} />;
  }

  return (
    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-mono font-extrabold ring-2 ring-[#050507] ${colorMap} ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
};
export default NotificationBadge;
