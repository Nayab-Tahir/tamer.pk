import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const BaseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    // baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().main.auth_token
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (patch) => ({
        url: `auth/login`,
        method: 'POST',
        body: patch,
      }),
    }),

    getAllUsers: builder.query({
      query: () => `user/all`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetAllUsersQuery } = BaseApi
