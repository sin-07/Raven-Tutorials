import React from 'react';
import { Badge } from './Badge';

interface BadgeGroupProps {
  badges: string[];
  max?: number;
  className?: string;
}

export const BadgeGroup: React.FC<BadgeGroupProps> = ({ badges, max = 3, className = '' }) => {
  const visible = badges.slice(0, max);
  const rem = Math.max(0, badges.length - max);

  return (
    <div className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
      {visible.map((b, i) => (
        <Badge key={i} variant="emerald">{b}</Badge>
      ))}
      {rem > 0 && (
        <span className="text-[10px] font-mono text-zinc-500 font-bold">+{rem} more</span>
      )}
    </div>
  );
};
export default BadgeGroup;
