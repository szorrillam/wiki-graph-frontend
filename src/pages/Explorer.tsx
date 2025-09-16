import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useConfig } from '../app/providers/ConfigProvider';
import { useExplore, useSaveExploration } from '../services/hooks';
import { useGraphStore, selectGraphData } from '../store/graphStore';
import { GraphCanvas } from '../widgets/GraphCanvas/GraphCanvas';
import { NodePanel } from '../widgets/NodePanel/NodePanel';
import { Toolbar } from '../widgets/Toolbar/Toolbar';
import { ToastArea, toast } from '../processes/notifications/toast';
import { Loader } from '../shared/ui/Loader';

export const ExplorerPage: React.FC = () => {
  const { title = '' } = useParams<{ title: string }>();
  const [sp, setSp] = useSearchParams();
  const { lang } = useConfig();
  const depth = Number(sp.get('depth') ?? 1);
  const includeSummaries = sp.get('include_summaries') === 'true';
  const { data, error, isFetching } = useExplore({ title, depth, lang, includeSummaries });
  const mergeGraph = useGraphStore((s) => s.mergeGraph);
  const reset = useGraphStore((s) => s.reset);
  const selectNode = useGraphStore((s) => s.selectNode);
  const graph = useGraphStore(selectGraphData);
  const root = useGraphStore((s) => s.root);
  const save = useSaveExploration();

  React.useEffect(() => {
    if (data) mergeGraph(data);
  }, [data, mergeGraph]);

  React.useEffect(() => {
    if (error) {
      const status = (error as any)?.response?.status;
      if ([429, 503, 504].includes(status)) toast.error(`Server busy (${status}). Try later.`);
      else toast.error('Failed to load graph');
    }
  }, [error]);

  const onExpand = (nodeTitle: string) => {
    sp.set('depth', '1');
    sp.set('include_summaries', includeSummaries ? 'true' : 'false');
    setSp(sp, { replace: false });
    window.history.pushState({}, '', `/explore/${encodeURIComponent(nodeTitle)}?${sp.toString()}`);
  };

  return (
    <div className="min-h-full">
      <Toolbar
        controls={
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500" htmlFor="depth-input">Depth</label>
            <input id="depth-input" className="input w-20" value={depth} onChange={(e) => { sp.set('depth', String(Math.max(1, Number(e.target.value) || 1))); setSp(sp); }} />
            <label className="text-sm text-gray-500" htmlFor="sum-input">Summaries</label>
            <input id="sum-input" type="checkbox" className="size-4" checked={includeSummaries} onChange={(e) => { sp.set('include_summaries', e.target.checked ? 'true' : 'false'); setSp(sp); }} />
            <button className="btn btn-outline" onClick={() => { reset(); toast.info('Graph reset'); }}>Reset</button>
            <button className="btn btn-primary" onClick={() => {
              try {
                save.mutate({ lang, root: root ?? title, graph });
              } catch (e) {
                /* handled by mutation */
              }
            }}>Save</button>
          </div>
        }
      />
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative">
            {isFetching && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-white/50 dark:bg-neutral-900/40">
                <Loader label="Loading graph…" />
              </div>
            )}
            <GraphCanvas onNodeClick={(id) => selectNode(id)} onNodeDoubleClick={(_, label) => label && onExpand(label)} />
          </div>
        </div>
        <div className="md:col-span-1">
          <NodePanel onExpand={(t) => onExpand(t)} />
        </div>
      </main>
      <ToastArea />
    </div>
  );
};


