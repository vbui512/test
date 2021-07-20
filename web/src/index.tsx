import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { themeMui } from "theme.styles";
import App from "./App";
import { initializeCommon, KeyValStorageProvider } from "@cbr/common/init";
import { loginState } from "./util/hooks/loginState";

const API_URL =
    process.env.NODE_ENV === "development"
        ? `http://${window.location.hostname}:8000/api/`
        : "/api/";

const localStorageProvider: KeyValStorageProvider = {
    getItem: async (key: string) => {
        return window.localStorage.getItem(key);
    },
    setItem: async (key: string, value: string) => {
        window.localStorage.setItem(key, value);
    },
};

initializeCommon({
    apiUrl: API_URL,
    keyValStorageProvider: localStorageProvider,
    shouldLogoutOnTokenRefreshFailure: true,
    logoutCallback: async () => {
        loginState.emit(false);
        window.location.replace("/");
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={themeMui}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);