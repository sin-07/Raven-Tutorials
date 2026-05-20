import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: string | number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-between ${className}`}>
      {steps.map((step, idx) => {
        const isDone = idx < currentStep;
        const isCurrent = idx === currentStep;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : isCurrent
                    ? 'border-2 border-emerald-400 text-emerald-400 bg-emerald-500/10'
                    : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <span className={`text-[11px] font-jakarta mt-1.5 ${isCurrent ? 'text-white font-bold' : 'text-zinc-500'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded ${isDone ? 'bg-emerald-500' : 'bg-zinc-800'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default StepIndicator;
