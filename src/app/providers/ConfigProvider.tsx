import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { appConfig } from '../config';
import { ConfigContext, type Config } from './ConfigContext';

// note: only component export remains in this file for fast-refresh friendliness

const DEFAULT_BASE = appConfig.defaultApiBaseUrl;
const DEFAULT_LANG = appConfig.defaultLang;
const DEFAULT_MAX = appConfig.maxRenderNodes;

const STORAGE_KEY = 'api.baseUrl';

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [baseUrl, setBaseUrlState] = useState<string>(DEFAULT_BASE);

  const [lang, setLang] = useState<string>(DEFAULT_LANG);
  const maxRenderNodes = useMemo(() => (Number.isFinite(DEFAULT_MAX) ? DEFAULT_MAX : 1000), []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, baseUrl);
  }, [baseUrl]);

  const setBaseUrl = useCallback((next: string) => {
    setBaseUrlState(next);
  }, []);

  const healthCheck = useCallback(async (): Promise<{ ok: boolean; url: string; status?: number }> => {
    const urls = ['/openapi.json', '/docs'];
    for (const path of urls) {
      try {
        const ctl = new AbortController();
        const id = setTimeout(() => ctl.abort(), 4000);
        const res = await fetch(new URL(path, baseUrl).toString(), { signal: ctl.signal, method: 'GET' });
        clearTimeout(id);
        if (res.ok) return { ok: true, url: path, status: res.status };
        return { ok: false, url: path, status: res.status };
      } catch {
        // continue
      }
    }
    return { ok: false, url: '/openapi.json' };
  }, [baseUrl]);

  const value = useMemo<Config>(() => ({ baseUrl, lang, maxRenderNodes, setBaseUrl, setLang, healthCheck }), [baseUrl, lang, maxRenderNodes, setBaseUrl, healthCheck]);

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};


