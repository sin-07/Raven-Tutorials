'use client';

import React from 'react';

export interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
  subtitle?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text,
  subtitle,
  fullScreen = false,
  className = '',
}) => {
  // Dimensions per size
  const ringSize = {
    xs: 'w-5 h-5',
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  }[size];

  const logoSize = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  }[size];

  const textSize = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }[size];

  const content = (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer ambient glow */}
      <div 
        className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129, 0.6) 0%, rgba(52, 211, 153, 0.2) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Futuristic Orbital Gyroscope */}
      <div className={`relative ${ringSize} flex items-center justify-center`}>
        {/* Track Ring (Subtle Translucent Base) */}
        <div className="absolute inset-0 rounded-full border border-white/10" />

        {/* Outer Fast Spin Ring (Electric Orange Neon Gradient) */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#10b981] border-r-[#34d399] animate-spin"
          style={{ animationDuration: '0.9s', filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.6))' }}
        />

        {/* Inner Counter-Rotating Ring (Amber Gold Glow) */}
        {size !== 'xs' && (
          <div 
            className="absolute inset-1.5 sm:inset-2 rounded-full border-2 border-transparent border-b-[#6ee7b7] border-l-[#34d399] animate-spin-reverse"
            style={{ 
              animation: 'raven-spin-reverse 1.2s linear infinite',
              filter: 'drop-shadow(0 0 8px rgba(110,231,183,0.6))' 
            }}
          />
        )}

        {/* Center Logo or Pulsing Core */}
        {size !== 'xs' && (
          <div className="relative z-10 flex items-center justify-center animate-pulse">
            <img
              src="/logo.png"
              alt="Raven Core"
              className={`${logoSize} object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]`}
              onError={(e) => {
                // Fallback to stylized dot if logo isn't rendered
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Tiny Center Energy Spark (for xs size) */}
        {size === 'xs' && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-ping" />
        )}
      </div>

      {/* Text & Status Details */}
      {(text || subtitle) && (
        <div className="mt-4 flex flex-col items-center text-center space-y-1 z-10">
          {text && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <p className={`font-outfit font-extrabold uppercase tracking-widest text-white ${textSize} drop-shadow-sm`}>
                {text}
              </p>
            </div>
          )}
          {subtitle && (
            <p className="text-[11px] font-space text-zinc-400 font-medium tracking-wider uppercase">
              {subtitle}
            </p>
          )}

          {/* Micro Progress Beam */}
          {size !== 'xs' && size !== 'sm' && (
            <div className="w-20 h-0.5 bg-white/10 rounded-full overflow-hidden mt-1.5">
              <div 
                className="h-full bg-gradient-to-r from-transparent via-[#10b981] to-transparent w-full animate-loader-beam"
                style={{ animation: 'raven-beam 1.4s ease-in-out infinite' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        role="status"
        aria-live="polite"
        className="fixed inset-0 z-[99999] bg-[#030407]/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 select-none"
      >
        {/* Subtle grid background aura */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating Card Wrapper */}
        <div className="relative z-10 px-8 py-10 rounded-3xl bg-[#0a0c14]/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.18)] flex flex-col items-center max-w-sm w-full">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center p-4">
      {content}
    </div>
  );
};

/**
 * Ultra-crisp, high-performance button spinner
 */
export const ButtonLoader: React.FC<{ className?: string; size?: number }> = ({ 
  className = '',
  size = 18 
}) => (
  <div 
    className={`inline-flex items-center justify-center relative ${className}`}
    style={{ width: size, height: size }}
    aria-label="Loading"
  >
    <div 
      className="absolute inset-0 rounded-full border border-white/20"
    />
    <div 
      className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ffffff] border-r-[#10b981] animate-spin"
      style={{ animationDuration: '0.7s' }}
    />
  </div>
);

export default Loader;
