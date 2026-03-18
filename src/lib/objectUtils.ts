export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(k => {
    if (k in obj) result[k] = obj[k];
  });
  return result;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(k => {
    delete result[k];
  });
  return result as Omit<T, K>;
}

export function isObjectEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
