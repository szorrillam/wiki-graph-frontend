import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '../../app/providers/Providers';
import { ApiExplorerPage } from '../ApiExplorer';

describe('ApiExplorerPage', () => {
  it('renders cards', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <ApiExplorerPage />
        </MemoryRouter>
      </AppProviders>
    );
    expect(screen.getByText(/API Explorer/)).toBeInTheDocument();
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });
});


