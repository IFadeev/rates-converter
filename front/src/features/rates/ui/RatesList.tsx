import { type FC, memo } from 'react';
import RateCard from './RateCard';
import type { Rate } from '../types';

interface RatesListProps {
  rates: Rate[];
  prevRates: Rate[];
  isLoading: boolean;
}

const RatesList: FC<RatesListProps> = ({ rates, prevRates, isLoading }) => {
  const skeletonCount = 10;

  if (isLoading) {
    return (
      <div data-testid="rates-skeleton" className="grid grid-cols-1 gap-1">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div key={idx} className="h-12 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div data-testid="rates-list" className="grid grid-cols-1 gap-0">
      {rates.map((rate) => {
        const prev = prevRates.find((r) => r.code === rate.code);
        return <RateCard key={rate.code} rate={rate} prevRate={prev} />;
      })}
    </div>
  );
};

export default memo(RatesList);
