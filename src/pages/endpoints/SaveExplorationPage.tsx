import React from 'react';
import { useConfig } from '../../app/providers/useConfig';
import { EndpointCard, PageContainer } from '../../shared/ui/EndpointLayout';

export const SaveExplorationPage: React.FC = () => {
  const { baseUrl, lang } = useConfig();
  const [root] = React.useState('Graph');
  const [body, setBody] = React.useState(JSON.stringify({ lang, root, graph: { nodes: [], edges: [] } }, null, 2));
  const [resp, setResp] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    setResp(null);
    const u = new URL('/api/explorations', baseUrl);
    const r = await fetch(u.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const j = await r.json().catch(() => ({}));
    setResp({ status: r.status, body: j });
    setLoading(false);
  };

  return (
    <PageContainer title="Agregar exploración">
      <EndpointCard title="Body">
        <label className="text-sm block">
          <div className="mb-1 text-gray-600">JSON</div>
          <textarea className="input h-56 font-mono" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Guardando…' : 'Guardar'}</button>
        </div>
      </EndpointCard>
      {resp && (
        <EndpointCard title="Respuesta">
          <div className="text-xs text-gray-600">Status: {resp.status}</div>
          <pre className="mt-2 overflow-auto rounded bg-gray-50 p-2 text-xs dark:bg-neutral-800">{JSON.stringify(resp.body, null, 2)}</pre>
        </EndpointCard>
      )}
    </PageContainer>
  );
};


