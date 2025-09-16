import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AppProviders } from './app/providers/Providers'
import { HomePage } from './pages/Home'
import { ApiExplorerPage } from './pages/ApiExplorer'
import { SearchPage } from './pages/endpoints/SearchPage'
import { ExplorePage } from './pages/endpoints/ExplorePage'
import { SaveExplorationPage } from './pages/endpoints/SaveExplorationPage'
import { ListExplorationsPage } from './pages/endpoints/ListExplorationsPage'
import { DeleteExplorationPage } from './pages/endpoints/DeleteExplorationPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api-explorer" element={<ApiExplorerPage />} />
          <Route path="/endpoint/search" element={<SearchPage />} />
          <Route path="/endpoint/explore" element={<ExplorePage />} />
          <Route path="/endpoint/save" element={<SaveExplorationPage />} />
          <Route path="/endpoint/list" element={<ListExplorationsPage />} />
          <Route path="/endpoint/delete" element={<DeleteExplorationPage />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  </StrictMode>,
)
