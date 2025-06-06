import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('рендерит форму и показывает ошибку при неверных данных', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>,
  );

  fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'wrong' } });
  fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'wrong' } });
  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
  expect(screen.getByText(/Неверное имя пользователя или пароль/i)).toBeInTheDocument();
});
