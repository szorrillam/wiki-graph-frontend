import React from 'react';

export const Loader: React.FC<{ label?: string }>
  = ({ label = 'Loading…' }) => (
  <output className="flex items-center gap-3 p-4" aria-live="polite">
    <svg className="h-5 w-5 animate-spin text-brand-600" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span className="text-sm text-gray-600 dark:text-neutral-300">{label}</span>
  </output>
);


