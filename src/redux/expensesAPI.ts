import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Expense } from "../types/types";

export type FirebaseResponseType<T extends { id: any }> = {
    [id in T["id"]]: Omit<T, "id">;
};

const expensesAPI = createApi({
    reducerPath: "expenses",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_DB_API_URL,
    }),
    tagTypes: ["Expenses"],
    endpoints: builder => ({
        getExpenses: builder.query<
            FirebaseResponseType<Expense>,
            { userId: string; token: string }
        >({
            query: ({ userId, token }) => ({
                url: `${userId}/expenses.json`,
                method: "GET",
                params: { auth: token },
            }),
            providesTags: ["Expenses"],
        }),

        getExpenseById: builder.query<
            Omit<Expense, "id">,
            { expenseId: string; userId: string; token: string }
        >({
            query: ({ expenseId, userId, token }) => ({
                url: `${userId}/expenses/${expenseId}.json`,
                method: "GET",
                params: { auth: token },
            }),
            providesTags: ["Expenses"],
        }),

        addExpense: builder.mutation<
            { name: string },
            {
                expense: Pick<Expense, "desc" | "amount" | "date">;
                userId: string;
                token: string;
            }
        >({
            query: ({ expense, userId, token }) => ({
                url: `${userId}/expenses.json`,
                method: "POST",
                body: expense,
                params: { auth: token },
            }),
            invalidatesTags: ["Expenses"],
        }),

        updateExpense: builder.mutation<
            Partial<Omit<Expense, "id">>,
            {
                expenseId: Expense["id"];
                expense: Partial<Omit<Expense, "id">>;
                userId: string;
                token: string;
            }
        >({
            query: ({ expenseId, expense, userId, token }) => ({
                method: "PATCH",
                url: `${userId}/expenses/${expenseId}.json`,
                body: expense,
                params: { auth: token },
            }),
            invalidatesTags: ["Expenses"],
        }),

        deleteExpenseById: builder.mutation<
            null,
            { expenseId: string; userId: string; token: string }
        >({
            query: ({ expenseId, userId, token }) => ({
                url: `${userId}/expenses/${expenseId}.json`,
                method: "DELETE",
                params: { auth: token },
            }),
            invalidatesTags: ["Expenses"],
        }),

        deleteAllExpenses: builder.mutation<
            null,
            { userId: string; token: string }
        >({
            query: ({ userId, token }) => ({
                url: `${userId}/expenses.json`,
                method: "DELETE",
                params: { auth: token },
            }),
            invalidatesTags: ["Expenses"],
        }),
    }),
});

export default expensesAPI;
export const {
    useGetExpensesQuery,
    useGetExpenseByIdQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseByIdMutation,
    useDeleteAllExpensesMutation,
} = expensesAPI;
