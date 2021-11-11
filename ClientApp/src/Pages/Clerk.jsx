import React from "react";
import { Route, Switch } from "react-router";
import NavbarClerk from "../components/Navbar/NavbarClerk";
import ManageOrder from "../components/ManageOrder/ManageOrder";
import Setting from "../components/Setting/Setting";

const Clerk = () => {
    return (
        <>
            <NavbarClerk />
            <Switch>
                <Route
                    path="/ManageOrder"
                    exact
                    component={ManageOrder}
                ></Route>
                <Route path="/Setting" exact component={Setting}></Route>
            </Switch>
        </>
    );
};

export default Clerk;
