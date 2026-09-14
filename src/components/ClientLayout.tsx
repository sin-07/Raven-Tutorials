'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AmbientGlow from '@/components/AmbientGlow';
import { initCartoonAnimations, initDirectionalAnimations } from '@/lib/gsap';
import { resetScrollLock } from '@/lib/scrollLock';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // Hide navbar on test pages
  const hideNavbar = pathname?.startsWith('/test/');

  // Initialize website-wide cartoon & directional animations on page change and safely reset scroll locks
  useEffect(() => {
    resetScrollLock();
    const timer = setTimeout(() => {
      initCartoonAnimations();
      initDirectionalAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AmbientGlow />
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

