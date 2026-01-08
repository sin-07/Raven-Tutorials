'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, UserCircle } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Join Raven Tutorials</h1>
          <p className="text-slate-600 text-lg">
            Choose your admission type to get started
          </p>
        </div>

        {/* Admission Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Learner Admission */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-200">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Admission as a Learner</h2>
            <p className="text-slate-600 mb-6 text-center">
              Join as a student to access expert courses, live classes, and personalized learning paths.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Access to 150+ expert courses</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Live classes & doubt sessions</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Certificate on completion</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 support access</span>
              </li>
            </ul>
            
            <Link
              href="/admission"
              className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all text-center"
            >
              Take Admission as Learner
            </Link>
          </div>

          {/* Tutor Admission */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-teal-200">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <UserCircle className="w-10 h-10 text-teal-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Admission as a Tutor</h2>
            <p className="text-slate-600 mb-6 text-center">
              Join as an instructor to share your knowledge and teach thousands of students.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Reach thousands of students</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Create and manage courses</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Conduct live sessions</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Earn while teaching</span>
              </li>
            </ul>
            
            <Link
              href="/admission?role=tutor"
              className="block w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all text-center"
            >
              Take Admission as Tutor
            </Link>
          </div>
        </div>
        
        {/* Login Link */}
        <p className="text-center text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

