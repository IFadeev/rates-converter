import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import * as ratesApi from '@/features/rates/api/ratesApi';
import RatesPage from './RatesPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockRates = Array.from({ length: 30 }, (_, i) => ({
  code: `C${i + 1}`,
  rate: (10 + i).toString(),
}));

// Мокированные данные
jest.spyOn(ratesApi, 'useGetRatesQuery').mockReturnValue({
  data: mockRates,
  isLoading: false,
  isFetching: false,
  error: undefined,
  refetch: jest.fn(),
});

test('RatesPage renders pagination and sorting correctly', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RatesPage />
      </BrowserRouter>
    </Provider>,
  );

  await waitFor(() => {
    expect(screen.getAllByTestId('rate-card')).toHaveLength(10);
  });

  fireEvent.click(screen.getByTestId('sort-button'));
  expect(screen.getAllByTestId('rate-code')[0]).toHaveTextContent('C1');

  fireEvent.click(screen.getByTestId('next-page-button'));
  await waitFor(() => {
    expect(screen.getAllByTestId('rate-code')[0]).toHaveTextContent('C11');
  });

  fireEvent.change(screen.getByTestId('page-size-select'), { target: { value: '25' } });
  expect(screen.getAllByTestId('rate-card')).toHaveLength(25);
});
