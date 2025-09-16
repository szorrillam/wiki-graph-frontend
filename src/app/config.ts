export const appConfig = {
  apiQueryParam: 'api',
  defaultApiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/',
  defaultLang: (import.meta.env.VITE_DEFAULT_LANG as string) || 'en',
  maxRenderNodes: Number(import.meta.env.VITE_MAX_RENDER_NODES ?? 1000),
};


