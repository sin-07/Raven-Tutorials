'use client';
import { useEffect } from 'react';

export function useDocumentTitle(title: string, restoreOnUnmount = false): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Raven Tutorials`;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle;
      }
    };
  }, [title, restoreOnUnmount]);
}
