import { USERS_API_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_API_URL}/login`,
                method: 'POST',
                body: data,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_API_URL}/logout`,
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_API_URL}`,
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;