import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getDatePlusSeconds } from "../utils";
import { RootState } from "./store";

type UserState = {
    loading: "idle" | "pending";
    error: string | undefined;
} & ({ id: string; token: string } | { id: undefined; token: undefined });

type LoginCredentials = {
    email: string;
    password: string;
};

type SavedData = {
    id: string;
    token: string;
    expiresAt: string; // date string
    refreshToken: string;
};

type SignInUpResponse =
    | {
          idToken: string;
          email: string;
          refreshToken: string;
          expiresIn: string;
          localId: string;
      }
    | {
          error: {
              code: number;
              message: string;
              errors: {
                  message: string;
                  domain: string;
                  reason: string;
              }[];
          };
      };

const AUTH_API = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: "AIzaSyC5oB4EOiZCLr8z_djr5fioYxc8vBXT-PU",
    },
});

const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }: LoginCredentials) => {
        const res = (
            await axios.post<SignInUpResponse>(
                `${process.env.EXPO_PUBLIC_AUTH_API_URL}accounts:signInWithPassword?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
            )
        ).data;
        if ("error" in res) throw new Error(res.error.message);

        // save user to local storage
        const userObj = {
            id: res.localId,
            token: res.idToken,
            expiresAt: getDatePlusSeconds(
                new Date(),
                +res.expiresIn,
            ).toISOString(),
            refreshToken: res.refreshToken,
        } satisfies SavedData;

        await AsyncStorage.setItem("user", JSON.stringify(userObj));
        return res;
    },
);

const logoutUser = createAsyncThunk("user/logout", async () => {
    await AsyncStorage.removeItem("user");
});

const signUpUser = createAsyncThunk(
    "user/signUp",
    async ({ email, password }: LoginCredentials) => {
        const res = (
            await axios.post<SignInUpResponse>(
                `${process.env.EXPO_PUBLIC_AUTH_API_URL}accounts:signUp?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
            )
        ).data;
        if ("error" in res) throw new Error(res.error.message);

        // save user to local storage
        const userObj = {
            id: res.localId,
            token: res.idToken,
            expiresAt: getDatePlusSeconds(
                new Date(),
                +res.expiresIn,
            ).toISOString(),
            refreshToken: res.refreshToken,
        } satisfies SavedData;

        await AsyncStorage.setItem("user", JSON.stringify(userObj));
        return res;
    },
);

const checkLoginStatus = createAsyncThunk<SavedData | {}>(
    "user/check",
    async () => {
        const userStr = await AsyncStorage.getItem("user");
        const savedData = JSON.parse(userStr ?? "{}") as SavedData | {};
        if (!("id" in savedData)) return {};

        // renew token if expired
        // const now = new Date();
        // const expiresAt = new Date(savedData.expiresAt);
        // if (now < expiresAt) return savedData;

        // const res = await axios.post<{
        //     expires_in: string;
        //     token_type: string;
        //     refresh_token: string;
        //     id_token: string;
        //     user_id: string;
        //     project_id: string;
        // }>(
        //     "https://securetoken.googleapis.com/v1/token",
        //     {
        //         grant_type: "refresh_token",
        //         refresh_token: savedData.refreshToken,
        //     },
        //     {
        //         params: {
        //             key: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        //         },
        //     },
        // );

        // const newSavedData = {
        //     expiresAt: getDatePlusSeconds(
        //         new Date(),
        //         +res.data.expires_in,
        //     ).toISOString(),
        //     refreshToken: res.data.refresh_token,
        //     token: res.data.id_token,
        //     id: res.data.user_id,
        // } satisfies SavedData;

        // await AsyncStorage.setItem("user", JSON.stringify(newSavedData));

        return savedData;
    },
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: undefined,
        token: undefined,
        loading: "idle",
        error: undefined,
    } as UserState,
    reducers: {
        resetError(state) {
            state.error = undefined;
        },
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, state => {
            state.loading = "pending";
            state.error = undefined;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.token = payload.idToken;
            state.id = payload.localId;
            state.loading = "idle";
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = "idle";
            state.error = action.error.message;
        });

        builder.addCase(logoutUser.pending, state => {
            state.loading = "pending";
            state.error = undefined;
        });
        builder.addCase(logoutUser.fulfilled, state => {
            state.loading = "idle";
            state.token = undefined;
            state.id = undefined;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = "idle";
            state.error = action.error.message;
        });

        builder.addCase(signUpUser.pending, state => {
            state.loading = "pending";
            state.error = undefined;
        });
        builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
            state.loading = "idle";
            state.token = payload.idToken;
            state.id = payload.localId;
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.loading = "idle";
            state.error = action.error.message;
        });

        builder.addCase(checkLoginStatus.pending, state => {
            state.loading = "pending";
            state.error = undefined;
        });
        builder.addCase(checkLoginStatus.fulfilled, (state, { payload }) => {
            if ("id" in payload) {
                state.token = payload.token;
                state.id = payload.id;
            }
            state.loading = "idle";
        });
    },
});

export default userSlice;
export const selectUser = (state: RootState) => state.user;
export { checkLoginStatus, loginUser, logoutUser, signUpUser };
