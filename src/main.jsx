import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeContextProvider } from './theme/ThemeContextProvider.jsx';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import DetailsPage from './pages/DetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="details/:country" element={<DetailsPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>
);
