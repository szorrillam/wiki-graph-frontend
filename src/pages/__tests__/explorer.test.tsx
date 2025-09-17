import React from 'react'; 
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '../../app/providers/Providers';
import { ExplorerPage } from '../Explorer';

describe('ExplorerPage', () => {
  it('mounts without crashing', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={["/explore/Graph?depth=1"]}>
          <Routes>
            <Route path="/explore/:title" element={<ExplorerPage />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
  });
});


