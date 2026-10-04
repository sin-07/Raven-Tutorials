'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Loader from '@/components/Loader';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return <Loader fullScreen size="lg" text="Redirecting to Login..." />;
}
