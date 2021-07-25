import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
    const history = useHistory();
    const passwordRef = useRef();
    const [errorMsg, setErrorMsg] = useState("");

    const authContext = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = passwordRef.current.value;

        const resetPasswordHandler = async () => {
            setErrorMsg("");
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDYaVQWxEsl3YwbXQDedxBLx3LVO67do3E",
                {
                    method: "POST",
                    body: JSON.stringify({
                        idToken: authContext.token,
                        password: enteredNewPassword,
                        returnSecureToken: false,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                let errorMessage = "Resetting password failed!";
                const data = await response.json();
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                setErrorMsg(errorMessage);
            } else {
                history.replace("/");
            }
        };

        resetPasswordHandler();
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input ref={passwordRef} type="password" id="new-password" />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
            {errorMsg.length > 0 && (
                <div className={classes.error}>
                    <p>{errorMsg}</p>
                </div>
            )}
        </form>
    );
};

export default ProfileForm;
