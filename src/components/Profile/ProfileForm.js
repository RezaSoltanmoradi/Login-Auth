import { message } from "antd";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
    const authCtx = useContext(AuthContext);
    const { loggedInData } = authCtx;
    const history = useHistory();
    const newPasswordInputRef = useRef();

    const sobmitHandler = (event) => {
        event.preventDefault();

        const getUserData = JSON.parse(localStorage.getItem("userData")) || [];
        console.log("getUsersData:", getUserData);

        const filterUsers = getUserData.filter(
            (user) => loggedInData.email !== user.email
        );
        console.log("filteredUser: ", filterUsers);

        const foundIndexUser = getUserData.findIndex(
            (user) => loggedInData.email === user.email
        );
        const enteredNewPassword = newPasswordInputRef.current.value;
        try {
            if (enteredNewPassword) {
                const newUserPassword = {
                    userName: getUserData[foundIndexUser].userName,
                    email: loggedInData.email,
                    password: enteredNewPassword,
                };
                console.log("newUser:", newUserPassword);
                const updatedUserData = {
                    email: loggedInData.email,
                    password: enteredNewPassword,
                };
                const updatedUsersData = [...filterUsers, newUserPassword];
                console.log("updatedUsers:", updatedUsersData);
                localStorage.setItem(
                    "userData",
                    JSON.stringify(updatedUsersData)
                );
                localStorage.setItem(
                    "userLoggedInData",
                    JSON.stringify(updatedUserData)
                );
                message.success("your password changed successfuly");
                newPasswordInputRef.current.value = "";
                history.push("/");
            }
        } catch (error) {
            message.error(" password have changed recently");
            newPasswordInputRef.current.value = "";
        }
    };
    return (
        <form className={classes.form} onSubmit={sobmitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    ref={newPasswordInputRef}
                    minLength="7"
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
