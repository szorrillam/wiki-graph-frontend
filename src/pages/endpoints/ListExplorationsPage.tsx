import React from 'react';
import { useConfig } from '../../app/providers/useConfig';
import { EndpointCard, PageContainer } from '../../shared/ui/EndpointLayout';

export const ListExplorationsPage: React.FC = () => {
  const { baseUrl } = useConfig();
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [items, setItems] = React.useState<Array<{ id: string; lang: string; root: string; created_at?: string }>>([]);
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    setItems([]);
    const u = new URL('/api/explorations', baseUrl);
    u.searchParams.set('skip', String(skip));
    u.searchParams.set('limit', String(limit));
    const r = await fetch(u.toString());
    const j = await r.json().catch(() => ({}));
    if (j && Array.isArray(j.items)) setItems(j.items);
    setLoading(false);
  };

  return (
    <PageContainer title="Listar exploraciones">
      <EndpointCard title="Parámetros">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <div className="mb-1 text-gray-600">skip</div>
            <input className="input" value={skip} onChange={(e) => setSkip(Number(e.target.value) || 0)} />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-gray-600">limit</div>
            <input className="input" value={limit} onChange={(e) => setLimit(Number(e.target.value) || 10)} />
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Cargando…' : 'Listar'}</button>
        </div>
      </EndpointCard>
      {items.length > 0 && (
        <EndpointCard title="Exploraciones">
          <div className="grid gap-3">
            {items.map((x) => (
              <div key={x.id} className="rounded-md border border-brand-100 p-3">
                <div className="font-medium text-brand-700">{x.root} ({x.lang})</div>
                <div className="text-xs text-gray-600">{x.created_at}</div>
              </div>
            ))}
          </div>
        </EndpointCard>
      )}
    </PageContainer>
  );
};


