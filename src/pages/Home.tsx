import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar } from '../widgets/Toolbar/Toolbar';
import { ToastArea } from '../processes/notifications/toast';
import { Compass, List, TerminalSquare, Plus } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-full">
      <Toolbar showBaseControls={false} />
      <main className="mx-auto max-w-7xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Wikipedia Graph Explorer</h1>
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">Navegación</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/endpoint/search" className="card hover:shadow transition-shadow">
              <div className="flex items-center gap-3">
                <TerminalSquare className="size-5 text-brand-600" />
                <div className="font-medium">Buscar</div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">GET /api/search</p>
            </Link>
            <Link to="/endpoint/explore" className="card hover:shadow transition-shadow">
              <div className="flex items-center gap-3">
                <List className="size-5 text-brand-600" />
                <div className="font-medium">Explorar</div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">GET /api/explore/{`{title}`}</p>
            </Link>
            <Link to="/endpoint/save" className="card hover:shadow transition-shadow">
              <div className="flex items-center gap-3">
                <Compass className="size-5 text-brand-600" />
                <div className="font-medium">Agregar</div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">POST /api/explorations</p>
            </Link>
            <Link to="/endpoint/list" className="card hover:shadow transition-shadow">
              <div className="flex items-center gap-3">
                <Plus className="size-5 text-brand-600" />
                <div className="font-medium">Listar / Eliminar</div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">GET /api/explorations y DELETE /api/explorations/{`{id}`}</p>
            </Link>
          </div>
        </section>
      </main>
      <ToastArea />
    </div>
  );
};


