import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-full">
      <header className="border-b bg-white/70 p-3 dark:bg-neutral-900/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="font-semibold">Wiki Graph</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-brand-600' : 'text-gray-600 dark:text-neutral-300'}>Home</NavLink>
            <NavLink to="/api-explorer" className={({ isActive }) => isActive ? 'text-brand-600' : 'text-gray-600 dark:text-neutral-300'}>API Explorer</NavLink>
            <NavLink to="/explorations" className={({ isActive }) => isActive ? 'text-brand-600' : 'text-gray-600 dark:text-neutral-300'}>Explorations</NavLink>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
};


