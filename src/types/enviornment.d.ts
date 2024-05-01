export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            EXPO_PUBLIC_DB_API_URL: string;
            EXPO_PUBLIC_FIREBASE_API_KEY: string;
            EXPO_PUBLIC_AUTH_API_URL: string;
        }
    }
}
