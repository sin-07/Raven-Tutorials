import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={`inline-flex items-center gap-1.5 ${className}`} aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-xl bg-zinc-800 border border-white/10 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="px-3 py-1 text-xs font-mono font-bold text-zinc-300 bg-zinc-900 border border-white/10 rounded-xl">
        {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-xl bg-zinc-800 border border-white/10 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700 transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};
export default Pagination;
