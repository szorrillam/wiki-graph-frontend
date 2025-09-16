import React from 'react';
import { Toolbar } from '../../widgets/Toolbar/Toolbar';
import { Link, NavLink } from 'react-router-dom';

export const PageContainer: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; showBaseControls?: boolean }>
  = ({ title, subtitle, children, showBaseControls = false }) => (
  <div className="min-h-full">
    <Toolbar showBaseControls={showBaseControls} />
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-700">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/" className="btn btn-outline">Inicio</Link>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <NavLink to="/endpoint/search" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:bg-gray-50 border border-transparent'}`}>Buscar</NavLink>
              <NavLink to="/endpoint/explore" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:bg-gray-50 border border-transparent'}`}>Explorar</NavLink>
              <NavLink to="/endpoint/save" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:bg-gray-50 border border-transparent'}`}>Agregar</NavLink>
              <NavLink to="/endpoint/list" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:bg-gray-50 border border-transparent'}`}>Listar</NavLink>
              <NavLink to="/endpoint/delete" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'text-gray-700 hover:bg-gray-50 border border-transparent'}`}>Eliminar</NavLink>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </main>
  </div>
);

export const EndpointCard: React.FC<{ title: string; description?: string; children: React.ReactNode }>
  = ({ title, description, children }) => (
  <section className="rounded-lg border border-brand-100 bg-white shadow-sm">
    <div className="rounded-t-lg border-b border-brand-100 bg-brand-50 px-4 py-3">
      <div className="text-sm font-semibold text-brand-700">{title}</div>
      {description && <p className="text-xs text-brand-700/80">{description}</p>}
    </div>
    <div className="p-4">
      {children}
    </div>
  </section>
);


