import React from 'react';
import { Avatar } from './Avatar';

interface AvatarGroupItem {
  name: string;
  src?: string;
}

interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'sm',
  className = ''
}) => {
  const visible = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  return (
    <div className={`flex items-center -space-x-2 overflow-hidden ${className}`}>
      {visible.map((item, idx) => (
        <Avatar key={idx} name={item.name} src={item.src} size={size} className="ring-2 ring-[#050507]" />
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 font-mono text-xs font-bold flex items-center justify-center ring-2 ring-[#050507] border border-white/10">
          +{remaining}
        </div>
      )}
    </div>
  );
};
export default AvatarGroup;
