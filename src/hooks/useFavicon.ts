'use client';
import { useEffect } from 'react';

export function useFavicon(href: string): void {
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [href]);
}
