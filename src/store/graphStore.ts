import { create } from 'zustand';
import type { GraphDTO, Node, Edge } from '../entities/types';

type GraphState = {
  nodesById: Record<string, Node>;
  edgesKeyed: Set<string>;
  root?: string;
  visited: Set<string>;
  selectedNode?: string;
  reset(): void;
  mergeGraph(graph: GraphDTO): void;
  selectNode(id?: string): void;
  expand(title: string): void;
};

export const useGraphStore = create<GraphState>((set, get) => ({
  nodesById: {},
  edgesKeyed: new Set(),
  visited: new Set(),
  reset() {
    set({ nodesById: {}, edgesKeyed: new Set(), visited: new Set(), root: undefined, selectedNode: undefined });
  },
  mergeGraph(graph) {
    const nextNodes = { ...get().nodesById } as Record<string, Node>;
    for (const n of graph.nodes) nextNodes[n.id] = { ...nextNodes[n.id], ...n };
    const edgesKeyed = new Set(get().edgesKeyed);
    const key = (e: Edge) => `${e.from}->${e.to}`;
    for (const e of graph.edges) edgesKeyed.add(key(e));
    set({ nodesById: nextNodes, edgesKeyed, root: get().root ?? graph.nodes[0]?.id });
  },
  selectNode(id) {
    set({ selectedNode: id });
  },
  expand(title) {
    const next = new Set(get().visited);
    next.add(title);
    set({ visited: next });
  },
}));

export const selectGraphData = (s: GraphState) => {
  const nodes = Object.values(s.nodesById);
  const edges: Edge[] = Array.from(s.edgesKeyed).map((k) => {
    const [from, to] = k.split('->');
    return { from, to };
  });
  return { nodes, edges };
};


