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
        {/* Animated cartoon ring */}
        <div className={`${sizeClasses[size]} border-black border-t-[#86efac] border-r-[#fef08a] rounded-full animate-spin`} />
        
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
        <p className={`font-outfit font-black text-black ${textSizes[size]} tracking-tight`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#f6fcf8]/85 backdrop-blur-xs flex items-center justify-center z-[150] p-4">
        <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-xs w-full flex flex-col items-center justify-center">
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
  <Loader2 className={`w-4 h-4 animate-spin text-black ${className}`} />
);

export default Loader;
