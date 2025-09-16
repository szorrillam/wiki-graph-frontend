export type Node = {
  id: string;
  label: string;
  summary?: string;
  centrality?: number;
};

export type Edge = {
  from: string;
  to: string;
};

export type GraphDTO = {
  nodes: Node[];
  edges: Edge[];
};

export type SearchResult = {
  title: string;
  description?: string;
};

export type SaveExplorationIn = {
  lang: string;
  root: string;
  graph: GraphDTO;
};


