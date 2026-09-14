'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f6fcf8] flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black rounded-3xl p-8 shadow-[6px_6px_0px_#000] text-center max-w-sm w-full">
        <div className="w-12 h-12 border-4 border-black border-t-[#86efac] rounded-full animate-spin mx-auto mb-4" />
        <h3 className="font-outfit font-black text-xl text-black">Redirecting to Login</h3>
        <p className="font-jakarta font-medium text-black/60 text-sm mt-1">Please wait a moment...</p>
      </div>
    </div>
  );
}
