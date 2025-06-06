import { type FC, useEffect, useState } from 'react';
import { useGetRatesQuery } from '@/features/rates/api/ratesApi';
import Decimal from 'decimal.js';
import { type ConvertResult } from '@/features/convert/types';

import { Repeat } from 'lucide-react';

const FIAT_CURRENCIES = ['USD', 'EUR', 'GBP', 'PLN', 'JPY'];

const ConvertControls: FC = () => {
  const {
    data: ratesData,
    isLoading,
    error,
  } = useGetRatesQuery(undefined, {
    pollingInterval: 30_000,
  });

  const allCurrencies = ratesData ? ratesData.map((r) => r.code) : [];

  const [from, setFrom] = useState<string>(allCurrencies[0]);
  const [to, setTo] = useState<string>(
    FIAT_CURRENCIES.length > 1 ? FIAT_CURRENCIES[0] : FIAT_CURRENCIES[0],
  );
  const [amount, setAmount] = useState<string>('0.00');
  const [result, setResult] = useState<ConvertResult | null>(null);

  useEffect(() => {
    if (from === to) {
      setResult({
        from,
        to,
        amount,
        rate: '',
        commission: '',
        total: '',
        rawTotal: '',
        isError: true,
      });
      return;
    }

    const findRateToUSD = (code: string): Decimal | null => {
      const found = ratesData ? ratesData.find((r) => r.code === code) : null;
      return found ? new Decimal(found.rate) : null;
    };

    const rateFromUSD = findRateToUSD(from);
    const rateToUSD = findRateToUSD(to);

    if (!rateFromUSD || !rateToUSD) {
      setResult({
        from,
        to,
        amount,
        rate: '',
        commission: '',
        total: '',
        rawTotal: '',
        isError: true,
      });
      return;
    }

    const computedRate = rateFromUSD.div(rateToUSD);

    let decAmount: Decimal;
    try {
      decAmount = new Decimal(amount);
    } catch {
      decAmount = new Decimal(0);
    }

    const rawTotal = computedRate.mul(decAmount);

    const commission = rawTotal.mul(new Decimal(0.03));

    let total = rawTotal.plus(commission);

    if (FIAT_CURRENCIES.includes(to)) {
      total = total.toDecimalPlaces(2, Decimal.ROUND_FLOOR);
    }

    const rateStr = computedRate.toSignificantDigits(18).toString();
    const commissionStr = commission.toSignificantDigits(18).toString();
    const totalStr = total.toString();

    setResult({
      from,
      to,
      amount,
      rate: rateStr,
      commission: commissionStr,
      total: totalStr,
      rawTotal: rawTotal.toString(),
      isError: false,
    });
  }, [from, to, amount, ratesData]);

  if (isLoading) {
    return <div>Loading rates...</div>;
  }
  if (error) {
    return <div className="text-red-600">Error loading data</div>;
  }
  if (!ratesData || ratesData.length === 0) {
    return <div className="text-red-600">No rates available</div>;
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <label className="block">
        <span className="text-gray-700">From</span>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value.trim())}
          className="mt-1 block w-full rounded border px-3 py-2 focus:ring-2 focus:ring-primary"
        >
          {allCurrencies.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">To</span>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value.trim())}
          className="mt-1 block w-full rounded border px-3 py-2 focus:ring-2 focus:ring-primary"
        >
          {FIAT_CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>

      <hr />
      <label className="block">
        <span className="text-gray-700">Amount</span>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value.trim())}
          className="mt-1 block w-full rounded border px-3 py-2 focus:ring-2 focus:ring-primary"
          placeholder="Введите число"
        />
      </label>

      <div className="mt-2 bg-gray-50 p-4 rounded border">
        {result === null ? null : result.isError ? (
          <div className="text-red-600">Unsupported operation or invalid data</div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-2xl font-semibold text-gray-900">1 {result.from}</p>

            <div className="my-4">
              <Repeat className="mx-auto text-gray-500" size={22} />
            </div>

            <p className="text-2xl font-bold text-blue-600">
              {new Decimal(result.total).toFixed(2)} {result.to}
            </p>

            <p className="text-md text-gray-500 mt-2">
              <span>
                ({new Decimal(result.rawTotal).toFixed(2)} {result.to}
                {' + 3% '})
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertControls;
