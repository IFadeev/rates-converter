import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Rate } from '../types';

export const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const ratesApi = createApi({
  reducerPath: 'ratesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['Rates'],
  endpoints: (build) => ({
    getRates: build.query<Rate[], void>({
      query: () => '/rates',
      providesTags: ['Rates'],
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useGetRatesQuery } = ratesApi;
