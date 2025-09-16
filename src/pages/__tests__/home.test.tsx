import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders } from '../../app/providers/Providers';
import { HomePage } from '../Home';

describe('HomePage', () => {
  it('renders title and search input', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AppProviders>
    );
    expect(screen.getByText(/Wikipedia Graph Explorer/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search Wikipedia titles/)).toBeInTheDocument();
  });
});


