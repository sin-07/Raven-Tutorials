import React from 'react';
import { Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
  className = ''
}) => {
  const configs = {
    info: { icon: Info, border: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-200' },
    warning: { icon: AlertTriangle, border: 'border-amber-500/20 bg-amber-500/5 text-amber-200' },
    success: { icon: CheckCircle2, border: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-200' },
    error: { icon: XCircle, border: 'border-rose-500/20 bg-rose-500/5 text-rose-200' }
  }[type];

  const Icon = configs.icon;

  return (
    <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed ${configs.border} ${className}`}>
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        {title && <h5 className="font-outfit font-bold uppercase tracking-wider text-white text-[11px]">{title}</h5>}
        <div className="font-jakarta text-zinc-300">{children}</div>
      </div>
    </div>
  );
};
export default Callout;
