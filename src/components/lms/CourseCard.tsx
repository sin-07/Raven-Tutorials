'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Clock, BookOpen, PlayCircle } from 'lucide-react';
import { Course } from '@/types/lms';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="h-full">
      <Link href={`/courses/${course.id}`}>
        <div className="group bg-[#0f111a] hover:bg-[#131622] rounded-3xl overflow-hidden border border-white/10 hover:border-[#e8602e]/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(232,96,46,0.15)] hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col cursor-pointer">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-black/40">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform opacity-90 group-hover:opacity-100"
            />

            {/* Play Button Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
              <div className="w-14 h-14 rounded-full bg-[#e8602e] text-white flex items-center justify-center shadow-[0_0_25px_rgba(232,96,46,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
                <PlayCircle className="w-8 h-8 fill-white text-[#e8602e] ml-0.5" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {course.isPopular && (
                <span className="px-2.5 py-0.5 bg-[#e8602e] text-white text-xs font-black font-space rounded-full shadow-[0_0_15px_rgba(232,96,46,0.4)]">
                  HOT
                </span>
              )}
              {course.isFree && (
                <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-xs font-black font-space rounded-full">
                  FREE
                </span>
              )}
            </div>

            {/* Level Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-[#ffaa40] border border-white/10 text-xs font-bold font-space rounded-full">
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col font-jakarta">
            {/* Category */}
            <span className="text-xs font-space font-extrabold text-[#ff7b47] uppercase tracking-wider">
              {course.category}
            </span>

            {/* Title */}
            <h3 className="mt-2 text-lg font-black text-white group-hover:text-[#ff7b47] transition-colors line-clamp-2 font-outfit">
              {course.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm text-zinc-400 line-clamp-2 flex-1 font-jakarta leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ff7b47]" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#ff7b47]" />
                <span>{course.totalLessons} lessons</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-white/10" />

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              {/* Instructor */}
              <div className="flex items-center gap-2.5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-white truncate max-w-[110px] font-outfit">
                    {course.instructor.name}
                  </span>
                  {course.instructor.qualification && (
                    <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[110px]">
                      {course.instructor.qualification}
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-xs font-bold font-space text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{course.rating}</span>
                </div>
                <div>
                  {course.isFree ? (
                    <span className="px-3 py-1 bg-[#e8602e] text-white font-extrabold text-xs rounded-full shadow-[0_0_15px_rgba(232,96,46,0.3)]">
                      FREE
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 font-space">
                      {course.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="px-2.5 py-1 bg-[#e8602e] text-white font-extrabold text-xs rounded-full shadow-[0_0_15px_rgba(232,96,46,0.3)]">
                        ₹{course.price.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
