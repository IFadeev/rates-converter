import reducer, { setPageSize, setSortOrder, setCurrentPage } from './ratesSettingsSlice';
import type { RatesSettingsState } from './ratesSettingsSlice';

describe('ratesSettingsSlice', () => {
  const initial: RatesSettingsState = { pageSize: 10, sortOrder: '', currentPage: 1 };

  test('setPageSize сбрасывает currentPage и ставит новый pageSize', () => {
    const next = reducer({ ...initial, currentPage: 3 }, setPageSize(25));
    expect(next.pageSize).toBe(25);
    expect(next.currentPage).toBe(1);
  });

  test('setSortOrder сбрасывает currentPage и ставит новый sortOrder', () => {
    const next = reducer({ ...initial, currentPage: 2 }, setSortOrder('asc'));
    expect(next.sortOrder).toBe('asc');
    expect(next.currentPage).toBe(1);
  });

  test('setCurrentPage меняет только currentPage', () => {
    const next = reducer(initial, setCurrentPage(5));
    expect(next.currentPage).toBe(5);
    expect(next.pageSize).toBe(initial.pageSize);
    expect(next.sortOrder).toBe(initial.sortOrder);
  });
});
