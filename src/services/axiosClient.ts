import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { z } from 'zod';
import type { IApiClient, IHealthClient } from './types';
import { GraphDTOSchema, SaveExplorationInSchema, SearchResponseSchema, ExplorationsListSchema } from './schemas';
import type { GraphDTO, SaveExplorationIn, SearchResult } from '../entities/types';
import { useConfig } from '../app/providers/useConfig';
import React from 'react';

const createInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({ baseURL, timeout: 15000 });
  api.interceptors.response.use(
    (resp) => resp,
    (error) => {
      // eslint-disable-next-line no-console
      console.error('API error:', error?.response?.status, error?.message);
      return Promise.reject(error);
    },
  );
  return api;
};

export const createAxiosApiClient = (baseURL: string): IApiClient & IHealthClient => {
  const api = createInstance(baseURL);

  return {
    async search(term: string, signal?: AbortSignal): Promise<SearchResult[]> {
      const res = await api.get('/api/search', {
        params: { term, limit: 10 },
        paramsSerializer: {
          serialize: (params) =>
            Object.entries(params)
              .filter(([, v]) => v !== undefined && v !== null && String(v) !== '')
              .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
              .join('&'),
        },
        signal,
      });
      const parsed = SearchResponseSchema.parse(res.data);
      return parsed;
    },

    async explore(params, signal?): Promise<GraphDTO> {
      const { title, depth, lang, includeSummaries } = params;
      const res = await api.get(`/api/explore/${encodeURIComponent(title)}`, {
        params: { depth, lang, include_summaries: includeSummaries ? 'true' : 'false' },
        signal,
      });
      return GraphDTOSchema.parse(res.data);
    },

    async saveExploration(input: SaveExplorationIn, signal?: AbortSignal): Promise<{ id: string }> {
      const body = SaveExplorationInSchema.parse(input);
      const res = await api.post('/api/explorations', body, { signal });
      return z.object({ id: z.string() }).parse(res.data);
    },

    async listExplorations(params, signal?): Promise<{ items: Array<{ id: string; lang: string; root: string; created_at?: string }>; total?: number }> {
      const res = await api.get('/api/explorations', { params, signal });
      return ExplorationsListSchema.parse(res.data);
    },

    async deleteExploration(id: string, signal?: AbortSignal): Promise<{ success: boolean }> {
      const res = await api.delete(`/api/explorations/${encodeURIComponent(id)}`, { signal });
      return z.object({ success: z.boolean().default(true) }).parse(res.data ?? { success: res.status === 200 || res.status === 204 });
    },

    async openApi(signal?: AbortSignal): Promise<boolean> {
      try {
        const res = await api.get('/openapi.json', { signal });
        return res.status >= 200 && res.status < 300;
      } catch {
        try {
          const res = await api.get('/docs', { signal });
          return res.status >= 200 && res.status < 300;
        } catch {
          return false;
        }
      }
    },
  };
};

// Hook that returns a client bound to current ConfigProvider baseUrl
export const useApiClient = () => {
  const { baseUrl } = useConfig();
  const client = React.useMemo(() => createAxiosApiClient(baseUrl), [baseUrl]);
  return client;
};


