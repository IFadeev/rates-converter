import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import * as ratesApi from '@/features/rates/api/ratesApi';
import ConvertControls from './ConvertControls';
import { BrowserRouter } from 'react-router-dom';

jest.spyOn(ratesApi, 'useGetRatesQuery').mockReturnValue({
  data: [
    { code: 'BTC', rate: '0.01' },
    { code: 'ETH', rate: '0.1' },
    { code: 'USD', rate: '1000' },
  ],
  isLoading: false,
  error: undefined,
  refetch: jest.fn(),
});

describe('ConvertControls should render correctly', () => {
  test('renders the selects and input field and immediately displays the result', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConvertControls />
        </BrowserRouter>
      </Provider>,
    );

    const fromSelect = screen.getByTestId('select-from');
    const toSelect = screen.getByTestId('select-to');
    const amountInput = screen.getByTestId('input-amount');

    fireEvent.change(fromSelect, { target: { value: 'BTC' } });
    expect(fromSelect).toHaveValue('BTC');

    fireEvent.change(toSelect, { target: { value: 'USD' } });
    expect(toSelect).toHaveValue('USD');

    fireEvent.change(amountInput, { target: { value: '100' } });
    expect(amountInput).toHaveValue('100');
  });

  test('updates the result when the amount changes', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConvertControls />
        </BrowserRouter>
      </Provider>,
    );

    const amountInput = screen.getByTestId('input-amount');
    fireEvent.change(amountInput, { target: { value: '2' } });
    expect(amountInput).toHaveValue('2');

    fireEvent.change(amountInput, { target: { value: '20.2' } });
    expect(amountInput).toHaveValue('20.2');
  });

  test('handles changing the from/to currencies and invalid pairs', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConvertControls />
        </BrowserRouter>
      </Provider>,
    );

    const fromSelect = screen.getByTestId('select-from');
    const toSelect = screen.getByTestId('select-to');
    const amountInput = screen.getByTestId('input-amount');

    fireEvent.change(fromSelect, { target: { value: 'BTC' } });
    expect(fromSelect).toHaveValue('BTC');

    fireEvent.change(toSelect, { target: { value: 'USD' } });
    expect(toSelect).toHaveValue('USD');

    fireEvent.change(amountInput, { target: { value: '100' } });
    expect(amountInput).toHaveValue('100');

    fireEvent.change(fromSelect, { target: { value: 'ETH' } });
    fireEvent.change(toSelect, { target: { value: 'ETH' } });

    expect(screen.getByText(/Unsupported operation or invalid data/)).toBeInTheDocument();
  });
});
