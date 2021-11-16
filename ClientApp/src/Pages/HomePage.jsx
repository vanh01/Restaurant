import React from "react";
import { Route, Switch } from "react-router";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const HomePage = ({ setUser }) => {
    return (
        <>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/Login" exact>
                    <Login setUser={setUser} />
                </Route>
                <Route path="/Register" exact>
                    <Register />
                </Route>
            </Switch>
        </>
    );
};

export default HomePage;
