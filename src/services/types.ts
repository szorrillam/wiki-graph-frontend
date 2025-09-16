import type { GraphDTO, SearchResult, SaveExplorationIn } from '../entities/types';

export interface IApiClient {
  search(term: string, signal?: AbortSignal): Promise<SearchResult[]>;
  explore(params: { title: string; depth: number; lang: string; includeSummaries?: boolean }, signal?: AbortSignal): Promise<GraphDTO>;
  saveExploration(input: SaveExplorationIn, signal?: AbortSignal): Promise<{ id: string }>;
  listExplorations(params: { skip?: number; limit?: number }, signal?: AbortSignal): Promise<{ items: Array<{ id: string; lang: string; root: string; created_at?: string }>; total?: number }>;
  deleteExploration(id: string, signal?: AbortSignal): Promise<{ success: boolean }>;
}

export interface IHealthClient {
  openApi(signal?: AbortSignal): Promise<boolean>;
}


