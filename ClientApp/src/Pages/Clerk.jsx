import React from "react";
import { Route, Switch } from "react-router";
import NavbarClerk from "../components/Navbar/NavbarClerk";
import ManageOrder from "../components/ManageOrder/ManageOrder";
import Setting from "../components/Setting/Setting";
import HomeClerk from "../components/Home/HomeClerk";

const Clerk = ({ setUser, User }) => {
    return (
        <>
            <NavbarClerk setUser={setUser} />
            <Switch>
                {/* <Route path="/" exact component={HomeClerk}></Route> */}
                <Route path="/" exact component={ManageOrder}></Route>
                <Route path="/Setting" exact>
                    <Setting setUser={setUser} User={User} />
                </Route>
            </Switch>
        </>
    );
};

export default Clerk;
