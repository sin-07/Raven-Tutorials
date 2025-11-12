export interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

export async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeoutMs = 8000, retries = 2, ...fetchOpts } = options;
  let attempt = 0;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { ...fetchOpts, signal: controller.signal });
      clearTimeout(timer);
      if (response.ok || attempt === retries) return response;
    } catch (err) {
      clearTimeout(timer);
      if (attempt === retries) throw err;
    }
    attempt++;
    await new Promise(r => setTimeout(r, 400 * Math.pow(2, attempt)));
  }
  throw new Error('fetchWithRetry: maximum retry limit exceeded');
}
