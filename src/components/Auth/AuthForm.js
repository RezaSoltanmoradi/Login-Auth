import { useState, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./AuthForm.module.css";
const isNotEmpty = (value) => value?.length >= 4;

const AuthForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const authCtx = useContext(AuthContext);
    const { register, login } = authCtx;
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
   

    const submitHandler = async (event) => {
        event.preventDefault();
        const validName = isNotEmpty(userName);
        const validEmail = isNotEmpty(email);
        const validPssword = isNotEmpty(password);
        const validLoginEmail = isNotEmpty(loginEmail);
        const validLoginPassword = isNotEmpty(loginPassword);

        const formValidation = validEmail && validPssword && validName;
        setIsloading(true);
        if (isLogin) {
            if (validLoginEmail && validLoginPassword) {
                login({ email: loginEmail, password: loginPassword });
            }
        } else {
            if (formValidation) {
                register({
                    userName: userName,
                    email: email,
                    password: password,
                });
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
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)
                            }
                        />
                    </div>
                )}
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={isLogin ? loginEmail : email}
                        onChange={(event) => {
                            isLogin
                                ? setLoginEmail(event.target.value)
                                : setEmail(event.target.value);
                        }}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={isLogin ? loginPassword : password}
                        onChange={(event) => {
                            isLogin
                                ? setLoginPassword(event.target.value)
                                : setPassword(event.target.value);
                        }}
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
