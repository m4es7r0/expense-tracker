import userSlice, { checkLoginStatus } from "./userSlice";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import expensesAPI from "./expensesAPI";

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [expensesAPI.reducerPath]: expensesAPI.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(expensesAPI.middleware);
    },
});

store.dispatch(checkLoginStatus());

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
