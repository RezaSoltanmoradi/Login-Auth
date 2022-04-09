import { Switch, Route } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthContext from "./context/auth-context";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Redirect } from "react-router-dom";

function App() {
    const authCtx = useContext(AuthContext);
    const { isLoggedin } = authCtx;
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/profile">
                    {isLoggedin && <UserProfile />}
                    {!isLoggedin && <Redirect to="auth" />}
                </Route>

                {!isLoggedin && (
                    <Route path="/auth">
                        <AuthPage />
                    </Route>
                )}
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
