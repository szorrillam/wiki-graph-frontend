import type { IApiClient } from '../../services/types';
import type { GraphDTO, SaveExplorationIn, SearchResult } from '../../entities/types';

export class MockApiClient implements IApiClient {
  async search(term: string): Promise<SearchResult[]> {
    if (!term) return [];
    return [
      { title: `${term} Alpha`, description: 'Mock result A' },
      { title: `${term} Beta`, description: 'Mock result B' },
    ];
  }
  async explore({ title }: { title: string; depth: number; lang: string; includeSummaries?: boolean }): Promise<GraphDTO> {
    return {
      nodes: [
        { id: title, label: title, summary: 'Root node' },
        { id: `${title}-1`, label: `${title} 1` },
      ],
      edges: [{ from: title, to: `${title}-1` }],
    };
  }
  async saveExploration(_input: SaveExplorationIn): Promise<{ id: string }> {
    return { id: 'mock-id' };
  }
  async listExplorations(): Promise<{ items: Array<{ id: string; lang: string; root: string; created_at?: string }>; total?: number }> {
    return { items: [{ id: '1', lang: 'en', root: 'Graph', created_at: new Date().toISOString() }] };
  }
  async deleteExploration(): Promise<{ success: boolean }> {
    return { success: true };
  }
}


