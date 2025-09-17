import React from 'react';
import { useConfig } from '../../app/providers/useConfig';
import { toast } from '../../processes/notifications/toast';

type Props = {
  controls?: React.ReactNode;
  showBaseControls?: boolean;
};

export const Toolbar: React.FC<Props> = ({ controls, showBaseControls = false }) => {
  const { baseUrl, setBaseUrl, lang, setLang, healthCheck } = useConfig();
  const [checking, setChecking] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState(baseUrl);

  React.useEffect(() => setUrlInput(baseUrl), [baseUrl]);

  const onCheck = async () => {
    setChecking(true);
    const res = await healthCheck();
    setChecking(false);
    if (res.ok) toast.success(`API healthy (${res.status}) at ${res.url}`);
    else toast.error('API not reachable');
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur dark:bg-neutral-900/70">
      <div className="mx-auto flex max-w-7xl items-center gap-3 p-3">
        {showBaseControls && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Base URL</span>
              <input className="input w-[22rem]" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} onBlur={() => setBaseUrl(urlInput)} placeholder="http://127.0.0.1:8000" />
              <button className="btn btn-outline" onClick={onCheck} disabled={checking}>{checking ? 'Checking…' : 'Health check'}</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Lang</span>
              <select className="input w-24" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">en</option>
                <option value="es">es</option>
                <option value="de">de</option>
                <option value="fr">fr</option>
              </select>
            </div>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">{controls}</div>
      </div>
    </div>
  );
};


