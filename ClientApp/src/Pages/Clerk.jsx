import React from "react";
import { Route, Switch } from "react-router";
import NavbarClerk from "../components/Navbar/NavbarClerk";
import ManageOrder from "../components/ManageOrder/ManageOrder";
import Setting from "../components/Setting/Setting";
import Home from "../components/Home/Home";

const Clerk = ({ setUser, User }) => {
    return (
        <>
            <NavbarClerk setUser={setUser} />
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route
                    path="/ManageOrder"
                    exact
                    component={ManageOrder}
                ></Route>
                <Route path="/Setting" exact>
                    <Setting User={User} />
                </Route>
            </Switch>
        </>
    );
};

export default Clerk;
