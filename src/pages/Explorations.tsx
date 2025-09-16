import React from 'react';
import { useExplorationsList, useDeleteExploration } from '../services/hooks';
import { Toolbar } from '../widgets/Toolbar/Toolbar';
import { Loader } from '../shared/ui/Loader';
import { useNavigate } from 'react-router-dom';

export const ExplorationsPage: React.FC = () => {
  const { data, isFetching } = useExplorationsList({ limit: 50 });
  const del = useDeleteExploration();
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      <Toolbar />
      <main className="mx-auto max-w-7xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Saved Explorations</h1>
        {isFetching && <Loader label="Loading explorations…" />}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(data?.items ?? []).map((x) => (
            <div key={x.id} className="card">
              <div className="font-medium">{x.root} ({x.lang})</div>
              <div className="text-xs text-gray-500">{x.created_at}</div>
              <div className="mt-3 flex gap-2">
                <button className="btn btn-outline" onClick={() => navigate(`/explore/${encodeURIComponent(x.root)}?depth=1&lang=${encodeURIComponent(x.lang)}`)}>Load</button>
                <button className="btn btn-outline" onClick={() => del.mutate(x.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


