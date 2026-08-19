'use client';
import { useState, useEffect } from 'react';

export function useNetworkSpeed(): string {
  const [speed, setSpeed] = useState('4g');

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as unknown as { connection: { effectiveType: string } }).connection;
      if (conn && conn.effectiveType) {
        setSpeed(conn.effectiveType);
      }
    }
  }, []);

  return speed;
}
