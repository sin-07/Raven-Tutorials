'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Compass } from 'lucide-react';
import { LMSFooter } from '@/components/lms';
import { gsap } from '@/lib/gsap';

export default function NotFound() {
  const cardRef = useRef<HTMLDivElement>(null);
  const badge404Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.8)' }
      );
    }
    if (badge404Ref.current) {
      gsap.to(badge404Ref.current, {
        rotation: 3,
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-transparent text-neutral-900 selection:bg-emerald-300 selection:text-black relative overflow-hidden flex flex-col justify-between pt-36">
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 w-full my-auto pb-16">
          <div ref={cardRef} className="bg-[#f0fdf4] border-3 border-black rounded-3xl p-8 sm:p-12 shadow-[10px_10px_0px_#000] text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcfce7] border-2 border-black text-emerald-950 text-xs sm:text-sm font-space font-bold shadow-[2px_2px_0px_#000] mx-auto">
              <Compass className="w-4 h-4 text-emerald-700 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Page Lost in Transit</span>
            </div>

            {/* Huge 404 Badge with subtle floating GSAP animation */}
            <div ref={badge404Ref} className="inline-block px-8 py-3 bg-emerald-300 text-black border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000] transform -rotate-2 will-change-transform">
              <span className="text-6xl sm:text-8xl font-black font-outfit tracking-wider">404</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-black font-outfit">
                Oops! Nothing Here
              </h1>
              <p className="text-sm sm:text-base text-neutral-700 font-jakarta font-medium max-w-md mx-auto">
                The tutorial, lecture, or page you&apos;re looking for has flown away or doesn&apos;t exist.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/"
                className="btn-cartoon w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-black font-outfit rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-spring cursor-pointer"
              >
                <Home className="w-4 h-4 text-black" />
                <span>Return to Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn-cartoon w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#dcfce7] hover:bg-[#bbf7d0] text-black font-black font-outfit rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-spring cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>

        <LMSFooter />
      </div>
    </>
  );
}
