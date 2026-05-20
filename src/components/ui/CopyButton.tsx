'use client';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, label, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.warn('Failed to copy to clipboard');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-jakarta font-medium transition cursor-pointer ${
        copied
          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          : 'bg-zinc-800/80 hover:bg-zinc-700 border-white/10 text-zinc-300 hover:text-white'
      } ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied!' : label || 'Copy'}</span>
    </button>
  );
};
export default CopyButton;
