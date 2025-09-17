import React from 'react';
import { useConfig } from '../../app/providers/useConfig';
import { EndpointCard, PageContainer } from '../../shared/ui/EndpointLayout';

export const SearchPage: React.FC = () => {
  const { baseUrl } = useConfig();
  const [term, setTerm] = React.useState('');
  const [limit, setLimit] = React.useState(10);
  const [items, setItems] = React.useState<Array<{ title?: string; description?: string; id?: string; label?: string }>>([]);
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    setItems([]);
    const u = new URL('/api/search', baseUrl);
    u.searchParams.set('term', term);
    u.searchParams.set('limit', String(limit));
    const r = await fetch(u.toString());
    const j = await r.json().catch(() => []);
    if (Array.isArray(j)) setItems(j);
    setLoading(false);
  };

  return (
    <PageContainer title="Buscar artículos">
      <div className="space-y-4">
      <EndpointCard title="Parámetros">
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <label className="text-sm">
            <div className="mb-1 text-gray-600">term</div>
            <input className="input" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="juan soto" />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-gray-600">cantidad</div>
            <select className="input" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Buscando…' : 'Buscar'}</button>
        </div>
      </EndpointCard>
      {items.length > 0 && (
        <EndpointCard title="Resultados">
          <div className="grid gap-3">
            {items.map((it) => {
              const key = it.title ?? it.label ?? it.id ?? Math.random().toString(36);
              const title = it.title ?? it.label ?? it.id ?? '';
              const desc = it.description ?? '';
              return (
                <div key={key} className="rounded-md border border-brand-100 p-3">
                  <div className="font-medium text-brand-700">{title}</div>
                  {desc && <div className="text-sm text-gray-600">{desc}</div>}
                </div>
              );
            })}
          </div>
        </EndpointCard>
      )}
      </div>
    </PageContainer>
  );
};


