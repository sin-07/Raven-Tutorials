'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import GlobalBackground from '@/components/GlobalBackground';
import RavenSplash from '@/components/RavenSplash';
import { 
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

  // Hide navbar on test and admin pages
  const hideNavbar = pathname?.startsWith('/test/') || pathname?.startsWith('/admin');

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

    // 1. Top Route Progress Bar Animation (only on route changes, not first mount)
    if (!isFirstRender.current && progressBarRef.current) {
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

    // 2. Smooth GSAP Page Entrance Transition (only on client navigations)
    if (!isFirstRender.current && pageRef.current) {
      animatePageEnter(pageRef.current, () => {
        initDirectionalAnimations(pageRef.current);
      });
    } else {
      initDirectionalAnimations();
    }

    isFirstRender.current = false;
  }, [pathname]);

  return (
    <>
      {/* Raven Tutorials Luxury Splash Screen Loader */}
      <RavenSplash />

      {/* Top Route Progress Bar (Cyber Emerald Laser accent) */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none opacity-0 bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#6ee7b7] border-b border-black/40 shadow-[0_2px_12px_rgba(16,185,129,0.6)]"
        style={{ width: '0%', transformOrigin: 'left center' }}
      />

      <GlobalBackground />
      {!hideNavbar && <Navbar />}

      {/* Main Page Transition Container */}
      <div ref={pageRef} className="page-transition-wrapper min-h-screen">
        {children}
      </div>
    </>
  );
}
