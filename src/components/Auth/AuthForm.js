import { useState, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./AuthForm.module.css";
const isNotEmpty = (value) => value?.length >= 4;

const AuthForm = () => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const authCtx = useContext(AuthContext);
    const { register, login } = authCtx;
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const resetUserValue = () => {
        // nameInputRef.current.value = "";
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
    };
    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current?.value;
        const enteredEmail = emailInputRef.current?.value;

        const enteredPassword = passwordInputRef.current?.value;

        const validName = isNotEmpty(enteredName);
        const validEmail = isNotEmpty(enteredEmail);
        const validPssword = isNotEmpty(enteredPassword);
        const formValidation = validEmail && validPssword && validName;
        setIsloading(true);
        if (isLogin) {
            if (validEmail && validPssword) {
                login({ email: enteredEmail, password: enteredPassword });
                resetUserValue();
            }
            setIsloading(false);
        } else {
            if (formValidation) {
                register({
                    userName: enteredName,
                    email: enteredEmail,
                    password: enteredPassword,
                });

                resetUserValue();
                setIsLogin(true);
                setIsloading(false);
            } else {
                setIsloading(false);
                return;
            }
        }
        setIsloading(false);
    };
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin && (
                    <div className={classes.control}>
                        <label htmlFor="name">Your name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            ref={nameInputRef}
                        />
                    </div>
                )}
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading ? (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    ) : (
                        <p style={{ color: "white" }}>Loading...</p>
                    )}

                    <button
                        type="submit"
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
