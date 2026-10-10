import React from 'react';
import { Spinner } from './Spinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, text = 'Loading...', children }) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center z-30 rounded-2xl animate-fade-in">
          <Spinner size={24} />
          <span className="text-xs font-jakarta text-zinc-200 mt-2 font-medium">{text}</span>
        </div>
      )}
    </div>
  );
};
export default LoadingOverlay;
