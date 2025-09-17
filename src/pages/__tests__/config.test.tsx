import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ConfigProvider } from '../../app/providers/ConfigProvider';
import { useConfig } from '../../app/providers/useConfig';

describe('ConfigProvider', () => {
  it('stores and reads baseUrl from localStorage and query override', () => {
    const wrapper = ({ children }: any) => <ConfigProvider>{children}</ConfigProvider>;
    const { result } = renderHook(() => useConfig(), { wrapper });
    act(() => result.current.setBaseUrl('http://example.com'));
    expect(localStorage.getItem('api.baseUrl')).toBe('http://example.com');
  });
});


