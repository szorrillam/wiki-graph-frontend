import React from 'react';
import { PageContainer } from '../shared/ui/EndpointLayout';
import { Modal } from '../shared/ui/Modal';
import { useConfig } from '../app/providers/useConfig';

type Item = { id: string; lang: string; root: string; created_at?: string };
type RawExploration = {
  id?: string; _id?: string;
  lang?: string; language?: string;
  root?: string; title?: string;
  created_at?: string; createdAt?: string; date?: string;
};

function hasArrayProp<K extends string>(obj: unknown, key: K): obj is Record<K, RawExploration[]> {
  return typeof obj === 'object' && obj !== null && Array.isArray((obj as Record<string, unknown>)[key]);
}

export const ExplorationsCrudPage: React.FC = () => {
  const { baseUrl, lang } = useConfig();
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [formRoot, setFormRoot] = React.useState('Graph');
  const [formLang, setFormLang] = React.useState(lang);
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const log = (...args: unknown[]) => console.info('[ExplorationsCRUD]', ...args);

  const fetchItems = React.useCallback(async () => {
    setLoading(true);
    try {
      const u = new URL('/api/explorations', baseUrl);
      log('Fetching explorations', { url: u.toString(), headers: { skip, limit } });
      const r = await fetch(u.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'skip': String(skip),
          'limit': String(limit),
        },
      });
      log('Response status', r.status, r.ok);
      const j = await r.json().catch((e) => { log('JSON parse error', e); return ([] as RawExploration[]); });
      const root: unknown = j as unknown;
      let raw: RawExploration[] = [];
      if (Array.isArray(root)) raw = root as RawExploration[];
      else if (hasArrayProp(root, 'items')) raw = root.items;
      else if (hasArrayProp(root, 'results')) raw = root.results;
      else if (hasArrayProp(root, 'data')) raw = root.data;
      log('Raw list length', Array.isArray(raw) ? raw.length : 0, 'sample', raw[0]);
      const normalized: Item[] = raw.map((x) => ({
        id: String(x.id ?? x._id ?? ''),
        lang: String(x.lang ?? x.language ?? ''),
        root: String(x.root ?? x.title ?? ''),
        created_at: x.created_at ?? x.createdAt ?? x.date ?? undefined,
      })).filter((x) => x.id && x.root);
      log('Normalized length', normalized.length);
      setItems(normalized);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, skip, limit]);

  React.useEffect(() => {
    log('Effect: load list');
    fetchItems();
  }, [fetchItems]);

  const del = async (id: string) => {
    log('Delete exploration', id);
    const r = await fetch(new URL(`/api/explorations/${encodeURIComponent(id)}`, baseUrl).toString(), { method: 'DELETE' });
    log('Delete status', r.status, r.ok);
    if (r.ok) setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const save = async () => {
    const body = { lang: formLang, root: formRoot, graph: { nodes: [], edges: [] } };
    log('Save exploration', body);
    const r = await fetch(new URL('/api/explorations', baseUrl).toString(), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    log('Save status', r.status, r.ok);
    if (r.ok) {
      setOpen(false);
      await fetchItems();
    }
  };

  return (
    <PageContainer title="Exploraciones (CRUD)">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-end gap-3">
            <div className="text-sm text-gray-600">{loading ? 'Cargando…' : 'Listado de exploraciones guardadas'}</div>
            <label className="text-sm">
              <div className="mb-1 text-gray-600">skip</div>
              <input className="input w-24" value={skip} onChange={(e) => setSkip(Math.max(0, Number(e.target.value) || 0))} />
            </label>
            <label className="text-sm">
              <div className="mb-1 text-gray-600">limit</div>
              <select className="input w-28" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                {[10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <button className="btn btn-outline" onClick={fetchItems} disabled={loading}>Refrescar</button>
          </div>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>Agregar exploración</button>
        </div>
        <div className="overflow-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-50 text-brand-700">
              <tr>
                <th className="px-3 py-2 text-left">id</th>
                <th className="px-3 py-2 text-left">root</th>
                <th className="px-3 py-2 text-left">lang</th>
                <th className="px-3 py-2 text-left">fecha</th>
                <th className="px-3 py-2 text-left">acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-3 py-2">{x.id}</td>
                  <td className="px-3 py-2">{x.root}</td>
                  <td className="px-3 py-2">{x.lang}</td>
                  <td className="px-3 py-2">{x.created_at}</td>
                  <td className="px-3 py-2">
                    <button className="btn btn-outline" onClick={() => del(x.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && !loading && (
                <tr>
                  <td className="px-3 py-6 text-center text-gray-600" colSpan={5}>Sin exploraciones</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} title="Nueva exploración" onClose={() => setOpen(false)} footer={
        <>
          <button className="btn btn-outline" onClick={() => setOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>
      }>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <div className="mb-1 text-gray-600">root</div>
            <input className="input" value={formRoot} onChange={(e) => setFormRoot(e.target.value)} />
          </label>
          <label className="text-sm">
            <div className="mb-1 text-gray-600">lang</div>
            <select className="input" value={formLang} onChange={(e) => setFormLang(e.target.value)}>
              {['en','es','de','fr'].map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
        </div>
      </Modal>
    </PageContainer>
  );
};


