import React from 'react';

interface TabsListProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`flex border-b border-white/10 gap-6 text-xs font-outfit font-bold ${className}`}>
      {tabs.map(tab => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`pb-3 border-b-2 transition-all ${
              isActive
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
export default TabsList;
