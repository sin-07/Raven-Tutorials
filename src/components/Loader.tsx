'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        {/* Animated luxury glow ring */}
        <div className={`${sizeClasses[size]} border-white/15 border-t-[#e8602e] border-r-[#ff814e] rounded-full animate-spin`} />
        
        {/* Logo in center if large */}
        {size === 'lg' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Raven Logo" 
              className="w-6 h-6 object-contain" 
            />
          </div>
        )}
      </div>
      {text && (
        <p className={`font-outfit font-bold text-white ${textSizes[size]} tracking-tight`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#06080f]/85 backdrop-blur-md flex items-center justify-center z-[150] p-4">
        <div className="bg-[#0f111a] border border-white/10 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(232,96,46,0.2)] text-center max-w-xs w-full flex flex-col items-center justify-center">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      {spinnerContent}
    </div>
  );
};

// Simple inline loader for buttons
export const ButtonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Loader2 className={`w-4 h-4 animate-spin text-white ${className}`} />
);

export default Loader;
