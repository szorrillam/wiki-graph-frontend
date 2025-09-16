import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../services/hooks';
import { Loader } from '../../shared/ui/Loader';

export const SearchBox: React.FC = () => {
  const [term, setTerm] = React.useState('');
  const navigate = useNavigate();
  const { data, isFetching } = useSearch(term);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <input className="input" placeholder="Search Wikipedia titles…" value={term} onChange={(e) => setTerm(e.target.value)} />
      {isFetching && <Loader label="Searching…" />}
      <ul className="divide-y rounded-md border dark:divide-neutral-800 dark:border-neutral-800">
        {(data ?? []).map((r) => (
          <li key={r.title} className="p-3 hover:bg-gray-50 dark:hover:bg-neutral-800">
            <button className="w-full text-left" onClick={() => navigate(`/explore/${encodeURIComponent(r.title)}?depth=1`)}>
              <div className="font-medium">{r.title}</div>
              {r.description && <div className="text-xs text-gray-600 dark:text-neutral-400">{r.description}</div>}
            </button>
          </li>
        ))}
        {term && !isFetching && (data?.length ?? 0) === 0 && (
          <li className="p-3 text-sm text-gray-600">No results</li>
        )}
      </ul>
    </div>
  );
};


