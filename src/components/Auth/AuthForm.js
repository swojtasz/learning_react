import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authContext = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const authHandler = async (url) => {
            setErrorMsg("");
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                let errorMessage = "Authentication failed!";
                const data = await response.json();
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                setErrorMsg(errorMessage);
            } else {
                const data = await response.json();
                const expirationTime = Date.now() + data.expiresIn * 1000;
                authContext.login(data.idToken, expirationTime);
                history.replace("/");
            }
        };
        if (isLogin) {
            setIsLoading(true);
            authHandler(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYaVQWxEsl3YwbXQDedxBLx3LVO67do3E"
            );
        } else {
            setIsLoading(true);
            authHandler(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYaVQWxEsl3YwbXQDedxBLx3LVO67do3E"
            );
        }
        setIsLoading(false);
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        ref={emailInputRef}
                        type="email"
                        id="email"
                        required
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        ref={passwordInputRef}
                        type="password"
                        id="password"
                        required
                    />
                </div>
                {errorMsg.length > 0 && (
                    <div className={classes.control}>
                        <p>{errorMsg}</p>
                    </div>
                )}
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}
                    {isLoading && <p>Loading...</p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
