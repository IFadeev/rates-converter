import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Rate } from '../types';

export const baseUrl = 'http://localhost:3000';

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
