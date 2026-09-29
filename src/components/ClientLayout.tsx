'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AmbientGlow from '@/components/AmbientGlow';
import { 
  initCartoonAnimations, 
  initDirectionalAnimations, 
  animatePageEnter, 
  cleanupScrollTriggers, 
  gsap 
} from '@/lib/gsap';
import { resetScrollLock } from '@/lib/scrollLock';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Hide navbar on test pages
  const hideNavbar = pathname?.startsWith('/test/');

  // GSAP Smooth Route Transition and Top Progress Bar
  useEffect(() => {
    // Safely reset any lingering modal/drawer scroll locks
    resetScrollLock();

    // Clean up orphaned ScrollTriggers from unmounted components
    cleanupScrollTriggers();

    // Instant reset scroll to top on route change (except on initial load)
    if (!isFirstRender.current && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // 1. Top Route Progress Bar Animation
    if (progressBarRef.current) {
      gsap.killTweensOf(progressBarRef.current);
      gsap.set(progressBarRef.current, { width: '0%', opacity: 1 });

      gsap.to(progressBarRef.current, {
        width: '72%',
        duration: 0.22,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(progressBarRef.current, {
            width: '100%',
            duration: 0.16,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(progressBarRef.current, {
                opacity: 0,
                duration: 0.18,
                ease: 'power1.in',
                onComplete: () => {
                  if (progressBarRef.current) {
                    gsap.set(progressBarRef.current, { width: '0%' });
                  }
                },
              });
            },
          });
        },
      });
    }

    // 2. Smooth GSAP Page Entrance Transition
    if (pageRef.current) {
      animatePageEnter(pageRef.current, () => {
        // Initialize cartoon and directional scroll animations on newly mounted DOM
        initCartoonAnimations(pageRef.current);
        initDirectionalAnimations(pageRef.current);
      });
    } else {
      initCartoonAnimations();
      initDirectionalAnimations();
    }

    isFirstRender.current = false;
  }, [pathname]);

  return (
    <>
      {/* Top Route Progress Bar (Neon Emerald / Gold cartoon accent) */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] pointer-events-none opacity-0 bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-300 border-b border-black shadow-[0_2px_0px_#000]"
        style={{ width: '0%', transformOrigin: 'left center' }}
      />

      <AmbientGlow />
      {!hideNavbar && <Navbar />}

      {/* Main Page Transition Container */}
      <div ref={pageRef} className="page-transition-wrapper min-h-screen">
        {children}
      </div>
    </>
  );
}
