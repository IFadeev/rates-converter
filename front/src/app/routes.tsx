import type { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated } from '@/features/auth/authSlice';
import LoginPage from '@/pages/LoginPage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/rates"
        element={
          <RequireAuth>
            <div data-testid="rates-page">Rates Page</div>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
