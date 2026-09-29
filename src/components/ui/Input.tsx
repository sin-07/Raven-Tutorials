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

const baseStyles = 'w-full px-4 py-3 bg-white border-2 text-black font-jakarta rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-black focus:-translate-y-0.5 focus:shadow-[3px_3px_0px_#000] outline-none transition-all duration-150 shadow-[2px_2px_0px_#000]';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`${baseStyles} ${hasError ? 'border-rose-500 bg-rose-50/60 text-rose-950' : 'border-black'} ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className = '', children, ...props }, ref) => (
    <select
      ref={ref}
      className={`${baseStyles} ${hasError ? 'border-rose-500 bg-rose-50/60 text-rose-950' : 'border-black'} ${className}`}
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
      className={`${baseStyles} ${hasError ? 'border-rose-500 bg-rose-50/60 text-rose-950' : 'border-black'} ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export default Input;
