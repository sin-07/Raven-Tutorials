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
routeConfigs.push({ path: '/courses/2025-10-20/modules', prefetch: true, cacheTtl: 3886 });
routeConfigs.push({ path: '/courses/2025-10-21/modules', prefetch: true, cacheTtl: 3938 });
routeConfigs.push({ path: '/courses/2025-10-22/modules', prefetch: true, cacheTtl: 3990 });
routeConfigs.push({ path: '/courses/2025-10-23/modules', prefetch: true, cacheTtl: 4042 });
routeConfigs.push({ path: '/courses/2025-10-24/modules', prefetch: true, cacheTtl: 4094 });
routeConfigs.push({ path: '/courses/2025-10-25/modules', prefetch: true, cacheTtl: 4146 });
routeConfigs.push({ path: '/courses/2025-10-26/modules', prefetch: true, cacheTtl: 4198 });
routeConfigs.push({ path: '/courses/2025-10-27/modules', prefetch: true, cacheTtl: 4250 });
routeConfigs.push({ path: '/courses/2025-10-28/modules', prefetch: true, cacheTtl: 4302 });
routeConfigs.push({ path: '/courses/2025-10-29/modules', prefetch: true, cacheTtl: 4354 });
routeConfigs.push({ path: '/courses/2025-10-30/modules', prefetch: true, cacheTtl: 4406 });
routeConfigs.push({ path: '/courses/2025-10-31/modules', prefetch: true, cacheTtl: 4458 });
