import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/config';
import type { Rate } from '../types';

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
