import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface NoticeBannerProps {
  text: string;
  tag?: string;
  onClose?: () => void;
  className?: string;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({
  text,
  tag = 'ANNOUNCEMENT',
  onClose,
  className = ''
}) => {
  return (
    <div className={`w-full px-4 py-2.5 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-zinc-900/80 border-b border-emerald-500/20 text-xs font-jakarta flex items-center justify-between text-zinc-200 ${className}`}>
      <div className="flex items-center gap-2 mx-auto">
        <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] uppercase">
          {tag}
        </span>
        <span className="font-medium text-white">{text}</span>
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className="p-1 text-zinc-400 hover:text-white transition cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
export default NoticeBanner;
