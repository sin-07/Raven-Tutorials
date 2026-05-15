'use client';
import React from 'react';

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl backdrop-blur-md ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
