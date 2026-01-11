'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // Hide navbar on test pages
  const hideNavbar = pathname?.startsWith('/test/');

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
