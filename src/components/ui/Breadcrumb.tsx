import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-jakarta text-zinc-400 ${className}`}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link href="/" className="hover:text-emerald-400 transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-1.5">
            <ChevronRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
            {item.href && !item.active ? (
              <Link href={item.href} className="hover:text-emerald-400 transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-200 font-semibold truncate max-w-[150px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
