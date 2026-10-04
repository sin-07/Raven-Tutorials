import React from 'react';
import Loader from '@/components/Loader';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Loader size="lg" text="Loading Raven Tutorials..." subtitle="Preparing academic resources" />
    </div>
  );
}
