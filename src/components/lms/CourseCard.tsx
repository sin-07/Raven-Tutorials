'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen, PlayCircle } from 'lucide-react';
import { Course } from '@/types/lms';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/courses/${course.id}`}>
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <PlayCircle className="w-8 h-8 text-blue-600 ml-1" />
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {course.isPopular && (
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                  Popular
                </span>
              )}
              {course.isFree && (
                <span className="px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">
                  Free
                </span>
              )}
            </div>

            {/* Level Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Category */}
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {course.category}
            </span>

            {/* Title */}
            <h3 className="mt-2 text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
              {course.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm text-slate-500 line-clamp-2 flex-1">
              {course.shortDescription}
            </p>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.totalLessons} lessons</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-100" />

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              {/* Instructor */}
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-slate-600 truncate max-w-[100px]">
                  {course.instructor.name}
                </span>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-slate-700">{course.rating}</span>
                </div>
                <div className="text-right">
                  {course.isFree ? (
                    <span className="text-lg font-bold text-teal-600">Free</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      {course.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-lg font-bold text-blue-600">
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
    </motion.div>
  );
}
