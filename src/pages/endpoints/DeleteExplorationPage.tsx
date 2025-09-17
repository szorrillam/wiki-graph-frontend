import React from 'react';
import { useConfig } from '../../app/providers/useConfig';
import { EndpointCard, PageContainer } from '../../shared/ui/EndpointLayout';

export const DeleteExplorationPage: React.FC = () => {
  const { baseUrl } = useConfig();
  const [id, setId] = React.useState('');
  const [done, setDone] = React.useState<{ status: number; success?: boolean } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    setLoading(true);
    setDone(null);
    const u = new URL(`/api/explorations/${encodeURIComponent(id)}`, baseUrl);
    const r = await fetch(u.toString(), { method: 'DELETE' });
    setDone({ status: r.status, success: r.ok });
    setLoading(false);
  };

  return (
    <PageContainer title="Eliminar exploración">
      <EndpointCard title="Parámetros">
        <label className="text-sm block">
          <div className="mb-1 text-gray-600">id</div>
          <input className="input" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" onClick={submit} disabled={loading || !id}>{loading ? 'Eliminando…' : 'Eliminar'}</button>
        </div>
      </EndpointCard>
      {done && (
        <EndpointCard title="Resultado">
          <div className="text-sm">Status: {done.status} • {done.success ? 'OK' : 'Error'}</div>
        </EndpointCard>
      )}
    </PageContainer>
  );
};


