import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from './ConfigProvider';

const qc = new QueryClient();

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
};


