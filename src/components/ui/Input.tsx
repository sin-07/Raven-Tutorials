import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  children: React.ReactNode;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const baseStyles = 'w-full px-4 py-3 bg-[#0d0f18] border text-white placeholder-zinc-500 font-jakarta rounded-xl focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] outline-none transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)]';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`${baseStyles} ${hasError ? 'border-rose-500/80 bg-rose-950/20 text-rose-200' : 'border-white/15 hover:border-white/30'} ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className = '', children, ...props }, ref) => (
    <select
      ref={ref}
      className={`${baseStyles} ${hasError ? 'border-rose-500/80 bg-rose-950/20 text-rose-200' : 'border-white/15 hover:border-white/30'} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = 'Select';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`${baseStyles} ${hasError ? 'border-rose-500/80 bg-rose-950/20 text-rose-200' : 'border-white/15 hover:border-white/30'} ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export default Input;
