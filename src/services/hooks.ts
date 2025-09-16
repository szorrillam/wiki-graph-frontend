import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from './axiosClient';
import type { GraphDTO, SaveExplorationIn, SearchResult } from '../entities/types';

// Debounce helper intentionally removed (unused)

export const useSearch = (term: string) => {
  const client = useApiClient();
  const ctrlRef = useMemo(() => ({ current: new AbortController() }), []);

  const q = useQuery<SearchResult[], Error>({
    queryKey: ['search', term, client],
    enabled: term.trim().length > 0,
    queryFn: async () => {
      ctrlRef.current.abort();
      ctrlRef.current = new AbortController();
      return client.search(term, ctrlRef.current.signal);
    },
    staleTime: 5 * 60 * 1000,
  });

  return q;
};

export const useExplore = (params: { title: string; depth: number; lang: string; includeSummaries?: boolean }) => {
  const client = useApiClient();
  const ctrlRef = useMemo(() => ({ current: new AbortController() }), []);
  return useQuery<GraphDTO, Error>({
    queryKey: ['explore', params, client],
    enabled: !!params.title,
    queryFn: async () => {
      ctrlRef.current.abort();
      ctrlRef.current = new AbortController();
      return client.explore(params, ctrlRef.current.signal);
    },
  });
};

export const useSaveExploration = () => {
  const client = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SaveExplorationIn) => client.saveExploration(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['explorations'] }),
  });
};

export const useExplorationsList = (params: { skip?: number; limit?: number }) => {
  const client = useApiClient();
  const ctrlRef = useMemo(() => ({ current: new AbortController() }), []);
  return useQuery({
    queryKey: ['explorations', params, client],
    queryFn: async () => {
      ctrlRef.current.abort();
      ctrlRef.current = new AbortController();
      return client.listExplorations(params, ctrlRef.current.signal);
    },
  });
};

export const useDeleteExploration = () => {
  const client = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => client.deleteExploration(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['explorations'] }),
  });
};


