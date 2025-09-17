import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../../app/providers/useConfig';
import { EndpointCard, PageContainer } from '../../shared/ui/EndpointLayout';

export const ExplorePage: React.FC = () => {
  const { baseUrl, lang } = useConfig();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('Theory of relativity');
  const [depth, setDepth] = React.useState(1);
  const [include, setInclude] = React.useState(true);
  const [graph, setGraph] = React.useState<{ nodes: Array<{ id: string; label: string; summary?: string }>; edges: Array<{ from: string; to: string }> } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    setGraph(null);
    const u = new URL(`/api/explore/${encodeURIComponent(title)}`, baseUrl);
    u.searchParams.set('depth', String(depth));
    u.searchParams.set('lang', lang);
    u.searchParams.set('include_summaries', include ? 'true' : 'false');
    const r = await fetch(u.toString());
    const j = await r.json().catch(() => ({}));
    if (j && Array.isArray(j.nodes) && Array.isArray(j.edges)) setGraph({ nodes: j.nodes, edges: j.edges });
    setLoading(false);
  };

  return (
    <PageContainer title="Explorar grafo">
      <EndpointCard title="Parámetros">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <div className="mb-1 text-gray-600">title</div>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-gray-600">depth</div>
            <input className="input" value={depth} onChange={(e) => setDepth(Number(e.target.value) || 1)} />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="size-4" checked={include} onChange={(e) => setInclude(e.target.checked)} />
            <span>include_summaries</span>
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Cargando…' : 'Explorar'}</button>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => navigate(`/explore/${encodeURIComponent(title)}?depth=${depth}&lang=${encodeURIComponent(lang)}&include_summaries=${include ? 'true' : 'false'}`)}
          >
            Abrir en Graph Explorer
          </button>
        </div>
      </EndpointCard>
      {graph && (
        <EndpointCard title="Resultado">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 text-sm font-semibold text-brand-700">Nodos</div>
              <div className="overflow-auto rounded border">
                <table className="min-w-full text-sm">
                  <thead className="bg-brand-50 text-brand-700">
                    <tr>
                      <th className="px-2 py-1 text-left">id</th>
                      <th className="px-2 py-1 text-left">label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {graph.nodes.map((n) => (
                      <tr key={n.id} className="odd:bg-white even:bg-gray-50">
                        <td className="px-2 py-1">{n.id}</td>
                        <td className="px-2 py-1">{n.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold text-brand-700">Aristas</div>
              <div className="overflow-auto rounded border">
                <table className="min-w-full text-sm">
                  <thead className="bg-brand-50 text-brand-700">
                    <tr>
                      <th className="px-2 py-1 text-left">from</th>
                      <th className="px-2 py-1 text-left">to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {graph.edges.map((e) => (
                      <tr key={`${e.from}->${e.to}`} className="odd:bg-white even:bg-gray-50">
                        <td className="px-2 py-1">{e.from}</td>
                        <td className="px-2 py-1">{e.to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </EndpointCard>
      )}
    </PageContainer>
  );
};


