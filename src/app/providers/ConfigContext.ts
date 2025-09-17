import { createContext } from 'react';

export type Config = {
  baseUrl: string;
  lang: string;
  maxRenderNodes: number;
  setBaseUrl(next: string): void;
  setLang(next: string): void;
  healthCheck(): Promise<{ ok: boolean; url: string; status?: number }>;
};

export const ConfigContext = createContext<Config | null>(null);


