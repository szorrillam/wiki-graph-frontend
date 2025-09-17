import { useContext } from 'react';
import { ConfigContext } from './ConfigContext';

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
};


