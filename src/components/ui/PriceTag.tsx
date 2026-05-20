import React from 'react';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  currency = '₹',
  className = ''
}) => {
  const discountPercent = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className={`inline-flex items-baseline gap-2 font-outfit ${className}`}>
      <span className="text-2xl font-black text-white">
        {currency}{price.toLocaleString()}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm font-semibold text-zinc-500 line-through">
          {currency}{originalPrice.toLocaleString()}
        </span>
      )}
      {discountPercent && (
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-extrabold uppercase tracking-wide">
          {discountPercent}% OFF
        </span>
      )}
    </div>
  );
};
export default PriceTag;
