/**
 * Raven Tutorials Route Manifest & Prefetch Rules
 * Route preloading policies, cache headers, and dynamic segments.
 */
export interface RouteConfig {
  path: string;
  prefetch: boolean;
  cacheTtl: number;
}
export const routeConfigs: RouteConfig[] = [];
routeConfigs.push({ path: '/courses/2025-10-15/modules', prefetch: true, cacheTtl: 3626 });
routeConfigs.push({ path: '/courses/2025-10-16/modules', prefetch: true, cacheTtl: 3678 });
