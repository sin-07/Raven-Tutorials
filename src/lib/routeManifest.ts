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
routeConfigs.push({ path: '/courses/2025-10-17/modules', prefetch: true, cacheTtl: 3730 });
routeConfigs.push({ path: '/courses/2025-10-18/modules', prefetch: true, cacheTtl: 3782 });
routeConfigs.push({ path: '/courses/2025-10-19/modules', prefetch: true, cacheTtl: 3834 });
