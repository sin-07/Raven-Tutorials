import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  status,
  className = ''
}) => {
  const sizeMap = {
    xs: { dim: 'w-6 h-6 text-[10px]', px: 24, dot: 'w-1.5 h-1.5' },
    sm: { dim: 'w-8 h-8 text-xs', px: 32, dot: 'w-2 h-2' },
    md: { dim: 'w-10 h-10 text-sm', px: 40, dot: 'w-2.5 h-2.5' },
    lg: { dim: 'w-12 h-12 text-base', px: 48, dot: 'w-3 h-3' },
    xl: { dim: 'w-16 h-16 text-lg', px: 64, dot: 'w-3.5 h-3.5' }
  }[size];

  const initials = name
    .split(' ')
    .map(p => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-zinc-500',
    busy: 'bg-rose-500'
  };

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      <div className={`rounded-full overflow-hidden border border-white/10 bg-zinc-800 text-zinc-200 font-outfit font-black flex items-center justify-center ${sizeMap.dim}`}>
        {src ? (
          <Image src={src} alt={name} width={sizeMap.px} height={sizeMap.px} className="object-cover w-full h-full" />
        ) : (
          <span>{initials || '?'}</span>
        )}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-[#090b14] ${sizeMap.dot} ${statusColors[status]}`}
        />
      )}
    </div>
  );
};
export default Avatar;
