import { type FC } from 'react';
import type { PageSizeOption } from '../model/ratesSettingsSlice';
import { RotateCw, ArrowUp, ArrowDown } from 'lucide-react';

interface RatesControlsProps {
  pageSize: PageSizeOption;
  sortOrder: '' | 'asc' | 'desc';
  onChangePageSize: (size: PageSizeOption) => void;
  onToggleSort: () => void;
  onRefresh: () => void;
  isRefetching: boolean;
}

const PAGE_SIZE_OPTIONS: PageSizeOption[] = [10, 25, 50, 100];

const RatesControls: FC<RatesControlsProps> = ({
  pageSize,
  sortOrder,
  onChangePageSize,
  onToggleSort,
  onRefresh,
  isRefetching,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <select
          value={pageSize}
          onChange={(e) => onChangePageSize(Number(e.target.value) as PageSizeOption)}
          className="h-10 rounded border px-3 py-1 focus:ring-2 focus:ring-primary"
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>

        <button
          onClick={onToggleSort}
          className="h-10 w-20 border rounded hover:bg-gray-100 transition flex items-center justify-center space-x-1"
        >
          <span className="text-sm">sort:</span>
          {sortOrder === '' ? (
            <span className="text-xs">none</span>
          ) : sortOrder === 'asc' ? (
            <ArrowUp className="h-4 w-4 text-primary" />
          ) : (
            <ArrowDown className="h-4 w-4 text-primary" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onRefresh}
          disabled={isRefetching}
          className="h-10 w-10 rounded hover:bg-gray-100 transition disabled:opacity-50 flex items-center justify-center"
        >
          <RotateCw
            size={22}
            className="text-primary animate-spin"
            style={{ animationDuration: isRefetching ? '0.5s' : '0s' }}
          />
        </button>
      </div>
    </div>
  );
};

export default RatesControls;
