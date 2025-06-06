import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  selectPageSize,
  selectSortOrder,
  selectCurrentPage,
  setPageSize,
  setSortOrder,
  setCurrentPage,
} from '@/features/rates/model/ratesSettingsSlice';
import RatesControls from '@/features/rates/ui/RatesControls';
import RatesList from '@/features/rates/ui/RatesList';
import type { Rate } from '@/features/rates/types';
import Decimal from 'decimal.js';
import { useGetRatesQuery } from '@/features/rates/api/ratesApi';

import Spinner from '@/shared/ui/Spinner';

import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RatesPage() {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(selectPageSize);
  const sortOrder = useAppSelector(selectSortOrder);
  const currentPage = useAppSelector(selectCurrentPage);

  const {
    data: ratesData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetRatesQuery(undefined, { pollingInterval: 5_000 });

  const [prevRates, setPrevRates] = useState<Rate[]>([]);

  useEffect(() => {
    if (ratesData) {
      setPrevRates(ratesData);
    }
  }, [ratesData]);

  const ratesArray = useMemo<Rate[]>(() => ratesData ?? [], [ratesData]);

  const sortedRates = useMemo<Rate[]>(() => {
    if (sortOrder === '') return ratesArray;
    return [...ratesArray].sort((a, b) => {
      const aNum = new Decimal(a.rate);
      const bNum = new Decimal(b.rate);
      return sortOrder === 'asc' ? aNum.minus(bNum).toNumber() : bNum.minus(aNum).toNumber();
    });
  }, [ratesArray, sortOrder]);

  const totalRates = sortedRates.length;
  const totalPages = Math.max(1, Math.ceil(totalRates / pageSize));
  const paginatedRates = useMemo<Rate[]>(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedRates.slice(startIndex, startIndex + pageSize);
  }, [sortedRates, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, totalPages, dispatch]);

  const handleChangePageSize = (size: 10 | 25 | 50 | 100) => {
    dispatch(setPageSize(size));
  };

  const handleToggleSort = () => {
    if (sortOrder === '') dispatch(setSortOrder('asc'));
    else if (sortOrder === 'asc') dispatch(setSortOrder('desc'));
    else dispatch(setSortOrder(''));
  };

  const handleRefresh = () => {
    refetch();
  };

  const handlePrevPage = () => {
    dispatch(setCurrentPage(Math.max(1, currentPage - 1)));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)));
  };

  if (isLoading) {
    return (
      <Spinner
        wrapperClassName="flex items-center justify-center h-screen"
        speedClass="animate-spin"
        textClassName="mt-2"
      />
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded">Ошибка при загрузке данных</div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <RatesControls
          pageSize={pageSize}
          sortOrder={sortOrder}
          onChangePageSize={handleChangePageSize}
          onToggleSort={handleToggleSort}
          onRefresh={handleRefresh}
          isRefetching={isFetching}
        />
      </div>

      <RatesList rates={paginatedRates} prevRates={prevRates} isLoading={isLoading} />

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          <ArrowLeft data-testid="prev-page-button" size={18} className="inline text-primary" />
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          <ArrowRight data-testid="next-page-button" size={18} className="inline text-primary" />
        </button>
      </div>
    </div>
  );
}
