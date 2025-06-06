import { type FC, memo, useEffect, useState } from 'react';
import Decimal from 'decimal.js';
import type { Rate } from '../types';

interface RateCardProps {
  rate: Rate;
  prevRate?: Rate;
}

const FLASH_DURATION = 1000;

const RateCard: FC<RateCardProps> = ({ rate, prevRate }) => {
  const formattedRate = new Decimal(rate.rate).toFixed(18);
  const [flash, setFlash] = useState<'up' | 'down' | ''>('');

  useEffect(() => {
    if (!prevRate) return;
    const current = new Decimal(rate.rate);
    const previous = new Decimal(prevRate.rate);

    if (current.gt(previous)) {
      setFlash('up');
      const t = setTimeout(() => setFlash(''), FLASH_DURATION);
      return () => clearTimeout(t);
    }
    if (current.lt(previous)) {
      setFlash('down');
      const t = setTimeout(() => setFlash(''), FLASH_DURATION);
      return () => clearTimeout(t);
    }
  }, [rate.rate, prevRate?.rate, prevRate]);

  return (
    <div
      data-testid="rate-card"
      className={`
        border
        bg-white
        hover:shadow-md
        cursor-pointer
        ${flash === 'up' ? 'flash-up' : ''}
        ${flash === 'down' ? 'flash-down' : ''}
      `}
    >
      <div className="flex justify-between items-center p-4">
        <span data-testid="rate-code" className="font-medium text-gray-800">
          {rate.code}
        </span>
        <span className="font-mono text-gray-700">{formattedRate}</span>
      </div>
    </div>
  );
};

export default memo(RateCard);
