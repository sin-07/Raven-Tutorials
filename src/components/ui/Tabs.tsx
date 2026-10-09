'use client';
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => (
  <div className="flex space-x-2 bg-[#121422] p-1.5 rounded-2xl border border-white/10 inline-flex">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-2 rounded-xl text-xs font-bold font-outfit transition ${
          activeTab === tab
            ? 'bg-[#10b981] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);
export default Tabs;
