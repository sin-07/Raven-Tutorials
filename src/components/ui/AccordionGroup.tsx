import React from 'react';
import { Accordion } from './Accordion';

export interface AccordionGroupItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionGroupProps {
  items: AccordionGroupItem[];
  className?: string;
}

export const AccordionGroup: React.FC<AccordionGroupProps> = ({ items, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map(item => (
        <Accordion key={item.id} title={item.title}>
          <div className="text-xs text-zinc-300 font-jakarta leading-relaxed">{item.content}</div>
        </Accordion>
      ))}
    </div>
  );
};
export default AccordionGroup;
