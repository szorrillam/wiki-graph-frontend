import React from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { useGraphStore, selectGraphData } from '../../store/graphStore';
import { useConfig } from '../../app/providers/useConfig';

type Props = {
  onNodeClick?: (id: string) => void;
  onNodeDoubleClick?: (id: string, label?: string) => void;
};

export const GraphCanvas: React.FC<Props> = ({ onNodeClick, onNodeDoubleClick }) => {
  const graph = useGraphStore(selectGraphData);
  const { maxRenderNodes } = useConfig();
  const [lastClick, setLastClick] = React.useState<{ id: string; ts: number } | null>(null);

  if (graph.nodes.length > maxRenderNodes) {
    return <div className="p-6 text-sm text-gray-600">Render limit exceeded ({graph.nodes.length}/{maxRenderNodes}). Refine your search.</div>;
  }

  return (
    <div className="h-[70vh] w-full">
      <ForceGraph3D
        graphData={{
          nodes: graph.nodes.map((n) => ({ id: n.id, name: n.label, val: Math.max(1, Math.min(8, (n.centrality ?? 1) * 3)) })),
          links: graph.edges.map((e) => ({ source: e.from, target: e.to })),
        }}
        nodeLabel={(n: any) => n.name}
        onNodeClick={(node: any) => {
          onNodeClick?.(String(node.id));
          const now = Date.now();
          if (lastClick && lastClick.id === node.id && now - lastClick.ts < 300) {
            onNodeDoubleClick?.(String(node.id), String(node.name));
          }
          setLastClick({ id: String(node.id), ts: now });
        }}
      />
    </div>
  );
};


