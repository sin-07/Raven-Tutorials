/**
 * Client analytics event dispatcher
 */
export function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, properties);
  }
}
