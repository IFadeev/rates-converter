import { type FC, memo } from 'react';
import Decimal from 'decimal.js';
import type { Rate } from '../types';

interface RateCardProps {
  rate: Rate;
  prevRate?: Rate;
}

const RateCard: FC<RateCardProps> = ({ rate, prevRate }) => {
  let bgClass = '';
  if (prevRate) {
    const current = new Decimal(rate.rate);
    const previous = new Decimal(prevRate.rate);
    if (current.gt(previous)) bgClass = 'bg-green-100';
    else if (current.lt(previous)) bgClass = 'bg-red-100';
  }

  const formattedRate = new Decimal(rate.rate).toFixed(18);

  return (
    <div
      className={`
        ${bgClass}
        border
        transition
        hover:shadow-md
        cursor-pointer
      `}
    >
      <div className="flex justify-between items-center p-4">
        <span className="font-medium text-gray-800">{rate.code}</span>
        <span className="font-mono text-gray-700">{formattedRate}</span>
      </div>
    </div>
  );
};

export default memo(RateCard);
