import { message } from "antd";
import react, { useState, useEffect } from "react";
const initialLoggedIn = localStorage.getItem("loggedIn");
const initialUserLoggedIndData = JSON.parse(
    localStorage.getItem("userLoggedInData")
);
const AuthContext = react.createContext({
    isLoggedin: initialLoggedIn ? initialLoggedIn : false,
    loggedInData: initialUserLoggedIndData ? initialUserLoggedIndData : null,
    register: (user) => {},
    login: (user) => {},
    logout: () => {},
});
export const AuthContextProvider = (props) => {
    const [userIsLoggedInd, setUserLoggedIn] = useState(
        initialLoggedIn || false
    );
    const [userLoggedInData, setUserIsLoggedInData] = useState(
        initialUserLoggedIndData ? initialUserLoggedIndData : null
    );

    const registerHandler = (userData) => {
        const getUserData = JSON.parse(localStorage.getItem("userData")) || [];
        const newUserData = {
            userName: userData.userName,
            email: userData.email,
            password: userData.password,
        };
        const foundUserEmail = getUserData?.find(
            (user) => user.email === userData.email
        );
        if (!foundUserEmail) {
            const updateUsersData = [...getUserData, newUserData];

            localStorage.setItem("userData", JSON.stringify(updateUsersData));
            message.success(" User created successfully");
        } else {
            message.error("email have already axisted");
            return;
        }
    };

    const loginHandler = (userData) => {
        const getUserData = JSON.parse(localStorage.getItem("userData")) || [];
        const foundUserEmail = getUserData?.find(
            (user) => user.email === userData.email
        );
        const foundUserPassword = getUserData?.find(
            (user) => user.password === userData.password
        );

        if (getUserData) {
            if (foundUserEmail && foundUserPassword) {
                setUserIsLoggedInData({
                    email: userData.email,
                    password: userData.password,
                });

                setUserLoggedIn(true);
                message.success("You have successfully logged in");
            } else {
                message.error("plase enter valid email and password");
                return;
            }
        } else {
            message.error(
                "there is no user like that \n to start please register"
            );
        }
        return userIsLoggedInd;
    };

    const logoutHandler = () => {
        setUserLoggedIn(false);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userLoggedInData");
    };
    useEffect(() => {
        if (userIsLoggedInd) {
            localStorage.setItem("loggedIn", userIsLoggedInd);
            localStorage.setItem(
                "userLoggedInData",
                JSON.stringify(userLoggedInData)
            );
        }
    }, [userIsLoggedInd]);
    const contextValue = {
        isLoggedin: userIsLoggedInd,
        register: registerHandler,
        login: loginHandler,
        logout: logoutHandler,
        loggedInData: userLoggedInData,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
