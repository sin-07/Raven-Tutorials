import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  className?: string;
}

export function StatCard({ label, value, change, isPositive = true, className = '' }: StatCardProps) {
  return (
    <div className={`p-5 rounded-2xl bg-[#0e131b]/80 border border-zinc-800 backdrop-blur-xl hover:border-zinc-700 transition-all ${className}`}>
      <span className="text-xs text-zinc-400 font-medium block mb-1">{label}</span>
      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-bold text-white font-mono">{value}</h4>
        {change && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
