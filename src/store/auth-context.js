import React, { useState } from "react";

let timeoutRef;

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const remainingTime = expirationTime - Date.now();

    return remainingTime;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    const remainingTime = calculateRemainingTime(expirationTime);

    if (remainingTime <= 60000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");

        return null;
    }

    return storedToken;
};

export const AuthContextProvider = (props) => {
    const initialToken = retrieveStoredToken();

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");

        if (timeoutRef) {
            clearTimeout(timeoutRef);
        }
    };

    const loginHandler = (token, expirationTime) => {
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        setToken(token);

        const remainingTime = calculateRemainingTime(expirationTime);

        timeoutRef = setTimeout(logoutHandler, remainingTime);
    };

    const contextValue = {
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
