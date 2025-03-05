import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { RecipePage } from '../pages/RecipePage';
import { SelectedPage } from '../pages/SelectedPage';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'recipe/:id', element: <RecipePage /> },
      { path: 'selected', element: <SelectedPage /> },
    ],
  },
]);
