import { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";

const MainNavigation = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const { logout, isLoggedin } = authCtx;
    const [loggedIn, setLoggedIn] = useState(null);
    const logoutHandler = () => {
        logout();
        history.push("/auth");
        message.success("You have successfully logged out");
    };
    useEffect(() => {
        setTimeout(() => {
            setLoggedIn(localStorage.getItem("loggedIn"));
        }, 0);
    }, [loggedIn, setLoggedIn, logout]);
    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!loggedIn ? (
                        <li>
                            <Link to="/auth">Login</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    )}

                    {loggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
