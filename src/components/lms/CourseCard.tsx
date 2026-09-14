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
        <div className="group bg-[#f0fdf4] hover:bg-[#e6f9ee] rounded-2xl overflow-hidden border-2 sm:border-[2.5px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden border-b-2 border-black bg-neutral-100">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Play Button Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
              <div className="w-14 h-14 rounded-full bg-emerald-300 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] transform scale-90 group-hover:scale-100 transition-transform">
                <PlayCircle className="w-8 h-8 text-black ml-0.5" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex gap-1.5">
              {course.isPopular && (
                <span className="px-2.5 py-0.5 bg-emerald-300 text-black border-2 border-black text-xs font-black font-space rounded-md shadow-[2px_2px_0px_#000]">
                  HOT
                </span>
              )}
              {course.isFree && (
                <span className="px-2.5 py-0.5 bg-emerald-400 text-black border-2 border-black text-xs font-black font-space rounded-md shadow-[2px_2px_0px_#000]">
                  FREE
                </span>
              )}
            </div>

            {/* Level Badge */}
            <div className="absolute top-2.5 right-2.5">
              <span className="px-2.5 py-0.5 bg-[#bbf7d0] text-black border-2 border-black text-xs font-extrabold font-space rounded-md shadow-[2px_2px_0px_#000]">
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col font-jakarta">
            {/* Category */}
            <span className="text-xs font-space font-black text-emerald-800 uppercase tracking-wider">
              {course.category}
            </span>

            {/* Title */}
            <h3 className="mt-1.5 text-lg font-black text-neutral-950 group-hover:text-blue-600 transition-colors line-clamp-2 font-outfit">
              {course.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm text-neutral-600 line-clamp-2 flex-1 font-jakarta leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-xs font-bold text-neutral-700">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-900" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-neutral-900" />
                <span>{course.totalLessons} lessons</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-3.5 border-t-2 border-black/10" />

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              {/* Instructor */}
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-black shadow-[1px_1px_0px_#000]"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-neutral-900 truncate max-w-[100px] font-outfit">
                    {course.instructor.name}
                  </span>
                  {course.instructor.qualification && (
                    <span className="text-[10px] text-neutral-500 font-medium truncate max-w-[100px]">
                      {course.instructor.qualification}
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 bg-yellow-100 border border-black px-2 py-0.5 rounded-md text-xs font-bold font-space shadow-[1px_1px_0px_#000]">
                  <Star className="w-3.5 h-3.5 text-black fill-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div>
                  {course.isFree ? (
                    <span className="px-2.5 py-1 bg-emerald-300 text-black border-2 border-black font-black text-xs rounded-lg shadow-[2px_2px_0px_#000]">
                      FREE
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 font-space">
                      {course.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-emerald-400 text-black font-black text-xs rounded-md border-2 border-black shadow-[2px_2px_0px_#000]">
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
