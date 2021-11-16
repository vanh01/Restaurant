import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router";
import "../css/login.css";

const Login = ({ setUser }) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [redirect, setredirect] = useState(false);

    function Submit() {
        fetch(
            "https://localhost:5001/api/account/login?username=" +
                UserName +
                "&password=" +
                Password
        )
            .then((response) => response.json())
            .then((response) => setUser(response));
        setredirect(true);
    }

    if (redirect) return <Redirect to="/Home" />;

    return (
        <>
            <Switch>
                <Route path="/Login" exact>
                    <div className="login">
                        <div className="login-form">
                            <input
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={Submit}>Login</button>
                        </div>
                    </div>
                </Route>
            </Switch>
        </>
    );
};

export default Login;
