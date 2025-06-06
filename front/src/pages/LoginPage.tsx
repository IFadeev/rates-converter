// src/features/auth/ui/LoginPage.tsx
import { useState, type FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
} from '@/features/auth/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/rates', { replace: true });
    }
  }, [navigate, isAuthenticated]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    if (username.trim() === 'demo' && password.trim() === 'demo') {
      dispatch(loginSuccess('demo-token'));
      navigate('/rates', { replace: true });
    } else {
      dispatch(loginFailure('Неверное имя пользователя или пароль'));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white rounded-sm shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-left">Welcome back!</h1>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <label className="block mb-2">
          <span className="text-gray-700">Login</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete={'username'}
            className="mt-1 block w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="demo"
            disabled={status === 'loading'}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={'current-password'}
            className="mt-1 block w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="demo"
            disabled={status === 'loading'}
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
