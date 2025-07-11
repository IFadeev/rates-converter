import { type FC, memo, useEffect, useState } from 'react';
import Decimal from 'decimal.js';
import type { Rate } from '../types';

import RateChart from './RateChart';
import CurrencyIcon from '@/shared/ui/CurrencyIcon';

interface RateCardProps {
  rate: Rate;
  prevRate?: Rate;
}

const FLASH_DURATION = 1000;

const RateCard: FC<RateCardProps> = ({ rate, prevRate }) => {
  const formattedRate = new Decimal(rate.rate).toFixed(16);
  const [flash, setFlash] = useState<'up' | 'down' | ''>('');
  const [isOpen, setIsOpen] = useState(false);

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
        hover:shadow-xl
        transition-shadow
        cursor-pointer
        ${flash === 'up' ? 'flash-up' : ''}
        ${flash === 'down' ? 'flash-down' : ''}
      `}
      onClick={() => setIsOpen((open) => !open)}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <CurrencyIcon code={rate.code} />
            <span data-testid="rate-code" className="font-medium text-gray-800">
              {rate.code}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-gray-700">{formattedRate}</span>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t bg-white">
          <RateChart code={rate.code} rate={rate.rate} />
        </div>
      )}
    </div>
  );
};

export default memo(RateCard);
