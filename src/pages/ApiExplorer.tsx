import React from 'react';
import { Toolbar } from '../widgets/Toolbar/Toolbar';
import { useConfig } from '../app/providers/useConfig';
import { toCurl } from '../shared/utils/curl';

type ResponseView = { status: number; timeMs: number; body: unknown } | null;

const useRequester = () => {
  const { baseUrl } = useConfig();
  const [resp, setResp] = React.useState<ResponseView>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const request = React.useCallback(async (method: string, path: string, params?: Record<string, string>, body?: unknown) => {
    setLoading(true);
    setError(null);
    const u = new URL(path, baseUrl);
    if (params) Object.entries(params).forEach(([k, v]) => (v !== undefined && v !== '') && u.searchParams.set(k, String(v)));
    const started = performance.now();
    try {
      const r = await fetch(u.toString(), {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const timeMs = Math.round(performance.now() - started);
      const text = await r.text();
      let parsed: unknown = text;
      try { parsed = JSON.parse(text); } catch {}
      setResp({ status: r.status, timeMs, body: parsed });
    } catch (e: any) {
      setError(e?.message ?? 'Network error');
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  return { resp, loading, error, request };
};

const Card: React.FC<{ title: string; method: string; path: string; params?: Array<{ key: string; label: string; placeholder?: string }>; body?: unknown }>
  = ({ title, method, path, params = [], body }) => {
  const [paramValues, setParamValues] = React.useState<Record<string, string>>({});
  const [bodyText, setBodyText] = React.useState(body ? JSON.stringify(body, null, 2) : '');
  const { baseUrl } = useConfig();
  const { resp, loading, error, request } = useRequester();
  const resolvedPath = path.includes('{') ? path.replace(/{(\w+)}/g, (_, p1) => encodeURIComponent(paramValues[p1] ?? `{${p1}}`)) : path;
  const url = new URL(resolvedPath, baseUrl);
  Object.entries(paramValues).forEach(([k, v]) => v && !resolvedPath.includes(`{${k}}`) && url.searchParams.set(k, v));
  const curl = toCurl({ method, url: url.toString(), headers: bodyText ? { 'Content-Type': 'application/json' } : undefined, body: bodyText ? (JSON as any).parseSafe?.(bodyText) ?? undefined : undefined });

  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-mono dark:bg-neutral-800">{method}</span>
      </div>
      <div className="mb-2 text-xs font-mono text-gray-600">{path}</div>
      {params.length > 0 && (
        <div className="mb-2 grid grid-cols-2 gap-2">
          {params.map((p) => (
            <label key={p.key} className="text-xs">
              <div className="mb-1 text-gray-500">{p.label}</div>
              <input className="input" placeholder={p.placeholder} value={paramValues[p.key] ?? ''} onChange={(e) => setParamValues({ ...paramValues, [p.key]: e.target.value })} />
            </label>
          ))}
        </div>
      )}
      {body !== undefined && (
        <label className="mb-2 block text-xs">
          <div className="mb-1 text-gray-500">Body (JSON)</div>
          <textarea className="input h-36 font-mono" value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
        </label>
      )}
      <div className="mb-2 flex gap-2">
        <button className="btn btn-primary" disabled={loading} onClick={() => request(method, resolvedPath, paramValues, bodyText ? (JSON as any).parseSafe?.(bodyText) ?? undefined : undefined)}>
          {loading ? 'Loading…' : 'Try it'}
        </button>
      </div>
      {resp && (
        <div className="mt-2 space-y-2">
          <div className="text-xs text-gray-600">Status: {resp.status} • Time: {resp.timeMs}ms</div>
          <pre className="overflow-auto rounded bg-gray-50 p-2 text-xs dark:bg-neutral-800">{JSON.stringify(resp.body, null, 2)}</pre>
        </div>
      )}
      <div className="mt-2">
        <div className="mb-1 text-xs text-gray-500">cURL</div>
        <pre className="overflow-auto rounded bg-gray-50 p-2 text-xs dark:bg-neutral-800">{curl}</pre>
      </div>
      {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
    </div>
  );
};

export const ApiExplorerPage: React.FC = () => {
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <div className="min-h-full">
      <Toolbar />
      <main className="mx-auto max-w-7xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">API Explorer</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Search" method="GET" path="/api/search" params={[{ key: 'term', label: 'term' }]} />
          <Card title="Explore" method="GET" path="/api/explore/{title}" params={[{ key: 'title', label: 'title' }, { key: 'depth', label: 'depth' }, { key: 'lang', label: 'lang' }, { key: 'include_summaries', label: 'include_summaries' }]} />
          <div id="post-explorations">
            <Card title="Save Exploration" method="POST" path="/api/explorations" body={{ lang: 'en', root: 'Graph', graph: { nodes: [], edges: [] } }} />
          </div>
          <Card title="List Explorations" method="GET" path="/api/explorations" params={[{ key: 'skip', label: 'skip' }, { key: 'limit', label: 'limit' }]} />
          <Card title="Delete Exploration" method="DELETE" path="/api/explorations/{id}" params={[{ key: 'id', label: 'id' }]} />
        </div>
      </main>
    </div>
  );
};


