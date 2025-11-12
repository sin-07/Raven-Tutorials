export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export function createLogger(namespace: string) {
  const prefix = `[Raven:${namespace}]`;
  return {
    info: (...args: unknown[]) => console.info(prefix, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    error: (...args: unknown[]) => console.error(prefix, ...args),
    debug: (...args: unknown[]) => {
      if (process.env.NODE_ENV === 'development') {
        console.debug(prefix, ...args);
      }
    }
  };
}
