import React from 'react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const config = [
    { label: 'Very Weak', color: 'bg-zinc-700' },
    { label: 'Weak', color: 'bg-rose-500' },
    { label: 'Fair', color: 'bg-amber-500' },
    { label: 'Good', color: 'bg-cyan-500' },
    { label: 'Strong', color: 'bg-emerald-500' }
  ][score];

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex gap-1.5 h-1">
        {Array.from({ length: 4 }, (_, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              idx < score ? config.color : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
        <span>Strength</span>
        <span className="font-bold text-white">{config.label}</span>
      </div>
    </div>
  );
};
export default PasswordStrength;
