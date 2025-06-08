import { type FC, memo } from 'react';
import RateCard from './RateCard';
import type { Rate } from '../types';

interface RatesListProps {
  rates: Rate[];
  prevRates: Rate[];
}

const RatesList: FC<RatesListProps> = ({ rates, prevRates }) => {
  return (
    <div data-testid="rates-list" className="grid grid-cols-1 gap-1">
      {rates.map((rate) => {
        const prev = prevRates.find((r) => r.code === rate.code);
        return <RateCard key={rate.code} rate={rate} prevRate={prev} />;
      })}
    </div>
  );
};

export default memo(RatesList);
