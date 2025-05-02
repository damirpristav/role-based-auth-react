import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';

import { GlobalProvider } from 'providers';
import { Dashboard } from 'pages/Dashboard';
import { UsersPage, UserPage } from 'pages/Users';
import { ArticlesPage, ArticlePage } from 'pages/Articles';
import { SignIn } from 'pages/Auth';
import { PrivateLayout, PublicLayout } from 'layouts';
import { PATHS } from './types';
import { ProtectedRoute } from './components';
import { UserRole } from 'types';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GlobalProvider />}>
      <Route path={PATHS.Dashboard} element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={PATHS.Users} element={<ProtectedRoute roles={[UserRole.Admin]} />}>
          <Route index element={<UsersPage />} />
          <Route path=":id" element={<UserPage />} />
        </Route>
        <Route path={PATHS.Articles} element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Editor]} />}>
          <Route index element={<ArticlesPage />} />
          <Route path=":id" element={<ArticlePage />} />
        </Route>
      </Route>
      <Route element={<PublicLayout />}>
        <Route path={PATHS.SignIn} element={<SignIn />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);
