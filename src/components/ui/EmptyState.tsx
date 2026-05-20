import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-8 text-center flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/60 bg-zinc-900/30 ${className}`}>
      <div className="p-3 rounded-2xl bg-zinc-800/80 border border-white/5 text-zinc-400 mb-3">
        <Inbox className="w-8 h-8" />
      </div>
      <h4 className="font-outfit font-bold text-base text-zinc-200 mb-1">{title}</h4>
      {description && <p className="text-xs font-jakarta text-zinc-400 max-w-sm mb-4">{description}</p>}
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-outfit font-bold text-xs rounded-xl transition cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
export default EmptyState;
