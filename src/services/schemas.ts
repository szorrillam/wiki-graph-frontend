import { z } from 'zod';

export const NodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  summary: z.string().optional(),
  centrality: z.number().optional(),
});

export const EdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const GraphDTOSchema = z.object({
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
});

export const SearchResultSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const SearchResponseSchema = z.array(SearchResultSchema);

export const SaveExplorationInSchema = z.object({
  lang: z.string(),
  root: z.string(),
  graph: GraphDTOSchema,
});

export const ExplorationsListItemSchema = z.object({
  id: z.string(),
  lang: z.string(),
  root: z.string(),
  created_at: z.string().optional(),
});

export const ExplorationsListSchema = z.object({
  items: z.array(ExplorationsListItemSchema),
  total: z.number().optional(),
});


