import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home as HomeIcon, Search, Compass, PlusSquare, List, TerminalSquare, Menu } from 'lucide-react';

type AppShellProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const AppShell: React.FC<AppShellProps> = ({ title, subtitle, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[16rem_1fr]">
          <aside className="border-r border-brand-100 bg-brand-50 md:sticky md:top-0 md:h-screen">
            <div className="flex items-center justify-between p-4 md:block">
              <Link to="/" className="flex items-center gap-2 font-semibold text-brand-700">
                <TerminalSquare className="size-5 text-brand-700" /> Wiki Graph
              </Link>
              <button className="btn btn-outline md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
                <Menu className="size-4" />
              </button>
            </div>
            <nav className={(open ? 'block' : 'hidden') + ' md:block space-y-1 p-2'}>
              <SideLink to="/" icon={<HomeIcon className="size-4" />}>Inicio</SideLink>
              <SideLink to="/endpoint/search" icon={<Search className="size-4" />}>Buscar</SideLink>
              <SideLink to="/endpoint/explore" icon={<Compass className="size-4" />}>Explorar</SideLink>
              <SideLink to="/endpoint/save" icon={<PlusSquare className="size-4" />}>Agregar</SideLink>
              <SideLink to="/explorations-crud" icon={<List className="size-4" />}>Exploraciones</SideLink>
            </nav>
          </aside>
          <section>
            {(title || subtitle) && (
              <div className="border-b border-brand-100 bg-white px-4 py-5">
                {title && <h1 className="text-2xl font-bold text-brand-700">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
              </div>
            )}
            <div className="p-4 md:p-6">
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const SideLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }>
  = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'bg-white text-brand-700 border border-brand-100' : 'text-gray-700 hover:bg-white/70'}`}
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);


