import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (val: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  size = 'md',
  className = ''
}) => {
  const iconSize = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }[size];

  return (
    <div className={`inline-flex items-center gap-1 ${className}`} role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, idx) => {
        const starIndex = idx + 1;
        const isFilled = starIndex <= value;
        return (
          <button
            key={idx}
            type="button"
            disabled={readOnly}
            onClick={() => onChange && onChange(starIndex)}
            className={`p-0.5 transition-transform ${!readOnly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              className={`${iconSize} transition-colors ${
                isFilled ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
export default Rating;
