import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { Avatar } from './Avatar';

interface RatingCardProps {
  studentName: string;
  courseName: string;
  rating: number;
  review: string;
  date: string;
  className?: string;
}

export const RatingCard: React.FC<RatingCardProps> = ({
  studentName,
  courseName,
  rating,
  review,
  date,
  className = ''
}) => {
  return (
    <div className={`p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/30 transition shadow-lg space-y-3 ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar name={studentName} size="sm" />
          <div>
            <h4 className="font-outfit font-bold text-sm text-white flex items-center gap-1.5">
              <span>{studentName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h4>
            <p className="text-[11px] text-zinc-400 font-jakarta">{courseName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20 text-amber-400 font-mono font-bold text-xs">
          <Star className="w-3 h-3 fill-amber-400" />
          <span>{rating}.0</span>
        </div>
      </div>
      <p className="text-xs text-zinc-300 font-jakarta leading-relaxed italic">"{review}"</p>
      <div className="pt-2 border-t border-white/5 text-[10px] font-space text-zinc-500">{date}</div>
    </div>
  );
};
export default RatingCard;
