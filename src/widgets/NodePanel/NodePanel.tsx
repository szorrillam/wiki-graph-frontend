import React from 'react';
import { useGraphStore } from '../../store/graphStore';
import { useConfig } from '../../app/providers/ConfigProvider';

export const NodePanel: React.FC<{ onExpand?: (title: string) => void }> = ({ onExpand }) => {
  const { selectedNode, nodesById } = useGraphStore((s) => ({ selectedNode: s.selectedNode, nodesById: s.nodesById }));
  const node = selectedNode ? nodesById[selectedNode] : undefined;
  const { lang } = useConfig();
  if (!node) return <div className="p-4 text-sm text-gray-500">Select a node to see details.</div>;
  const wikiUrl = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(node.label)}`;
  return (
    <div className="space-y-2 p-4 text-sm">
      <div className="text-lg font-semibold">{node.label}</div>
      {node.summary && <p className="text-gray-600 dark:text-neutral-300">{node.summary.slice(0, 280)}</p>}
      <div className="flex gap-2">
        <a className="btn btn-outline" href={wikiUrl} target="_blank" rel="noreferrer">Open in Wikipedia</a>
        <button className="btn btn-primary" onClick={() => onExpand?.(node.label)}>Expand</button>
      </div>
    </div>
  );
};


