import Decimal from 'decimal.js';

export interface ConversionResult {
  rate: string;
  rawTotal: string;
  commission: string;
  total: string;
  isError: boolean;
}

export function calculateConversion(
  ratesData: Array<{ code: string; rate: string }>,
  from: string,
  to: string,
  amount: string,
): ConversionResult {
  if (from === to) {
    return { rate: '', rawTotal: '', commission: '', total: '', isError: true };
  }

  const findRate = (code: string) => {
    const entry = ratesData.find((r) => r.code === code);
    return entry ? new Decimal(entry.rate) : null;
  };

  const rateFromUSD = findRate(from);
  const rateToUSD = findRate(to);
  if (!rateFromUSD || !rateToUSD) {
    return { rate: '', rawTotal: '', commission: '', total: '', isError: true };
  }

  const computedRate = rateFromUSD.div(rateToUSD);

  let decAmount: Decimal;
  try {
    decAmount = new Decimal(amount || 0);
  } catch {
    return { rate: '', rawTotal: '', commission: '', total: '', isError: true };
  }

  const rawTotal = computedRate.mul(decAmount);
  const commission = rawTotal.mul(new Decimal(0.03));
  let total = rawTotal.plus(commission);

  const FIAT = ['USD', 'EUR'];
  if (FIAT.includes(to)) {
    total = total.toDecimalPlaces(2, Decimal.ROUND_FLOOR);
  }

  return {
    rate: computedRate.toSignificantDigits(18).toString(),
    rawTotal: rawTotal.toSignificantDigits(18).toString(),
    commission: commission.toSignificantDigits(18).toString(),
    total: total.toString(),
    isError: false,
  };
}
