import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

export interface RatesSettingsState {
  pageSize: PageSizeOption;
  sortOrder: '' | 'asc' | 'desc';
  currentPage: number;
}

const initialState: RatesSettingsState = {
  pageSize: PAGE_SIZE_OPTIONS[0],
  sortOrder: '',
  currentPage: 1,
};

const ratesSettingsSlice = createSlice({
  name: 'ratesSettings',
  initialState,
  reducers: {
    setPageSize(state, action: PayloadAction<PageSizeOption>) {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setSortOrder(state, action: PayloadAction<'' | 'asc' | 'desc'>) {
      state.sortOrder = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPageSize, setSortOrder, setCurrentPage } = ratesSettingsSlice.actions;
export default ratesSettingsSlice.reducer;

export const selectPageSize = (state: RootState) => state.ratesSettings.pageSize;
export const selectSortOrder = (state: RootState) => state.ratesSettings.sortOrder;
export const selectCurrentPage = (state: RootState) => state.ratesSettings.currentPage;
