import React from 'react';
import { AppShell } from './AppShell';

export const PageContainer: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }>
  = ({ title, subtitle, children }) => (
  <AppShell title={title} subtitle={subtitle}>{children}</AppShell>
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


