import authReducer, { loginSuccess, loginFailure, logout } from '@/features/auth/authSlice';

const initial = { token: null, error: null, status: 'idle' as const };

test('loginSuccess сохраняет токен', () => {
  const next = authReducer(initial, loginSuccess('demo-token'));
  expect(next.token).toBe('demo-token');
  expect(next.error).toBeNull();
});

test('loginFailure сбрасывает токен и записывает ошибку', () => {
  const next = authReducer(initial, loginFailure('Ошибка'));
  expect(next.token).toBeNull();
  expect(next.error).toBe('Ошибка');
});

test('logout сбрасывает состояние', () => {
  const next = authReducer(initial, logout());
  expect(next.token).toBeNull();
  expect(next.error).toBeNull();
});
