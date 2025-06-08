import Decimal from 'decimal.js';
import { calculateConversion } from './calculateConversion';

describe('calculateConversion()', () => {
  const rates = [
    { code: 'BTC', rate: '2' },
    { code: 'USD', rate: '1' },
    { code: 'ETH', rate: '0.5' },
  ];

  it('should convert from BTC to USD correctly for amount = 10', () => {
    const res = calculateConversion(rates, 'BTC', 'USD', '10');
    expect(res.isError).toBe(false);
    expect(res.rate).toBe(new Decimal(2).toString());
    expect(res.rawTotal).toBe(new Decimal(20).toString());
    expect(res.commission).toBe(new Decimal(0.6).toString());
    expect(res.total).toBe('20.6');
  });

  it('should return isError for unknown currency codes', () => {
    const res = calculateConversion(rates, 'BTC', 'XYZ', '1');
    expect(res.isError).toBe(true);
    expect(res.rate).toBe('');
    expect(res.total).toBe('');
  });

  it('should return isError for invalid amount', () => {
    const res = calculateConversion(rates, 'BTC', 'USD', 'not a number');
    expect(res.isError).toBe(true);
  });

  it('should support zero amount', () => {
    const res = calculateConversion(rates, 'BTC', 'USD', '0');
    expect(res.isError).toBe(false);
    expect(res.rawTotal).toBe('0');
    expect(res.commission).toBe('0');
    expect(res.total).toBe('0');
  });
});
