import React from "react";
import { Route, Switch } from "react-router";
// import { useEffect } from "react";
import NavbarManager from "../components/Navbar/NavbarManager";
import EditMenu from "../components/EditMenu/EditMenu";
import ManageAccount from "../components/ManageAccount/ManageAccount";
import HistoryOfManage from "../components/History/HistoryOfManage";
import Setting from "../components/Setting/Setting";

const Manager = ({ setUser, User }) => {
    return (
        <>
            <NavbarManager setUser={setUser} />
            <Switch>
                <Route path="/" exact component={EditMenu}></Route>
                <Route
                    path="/ManageAccount"
                    exact
                    component={ManageAccount}
                    User={User}
                ></Route>
                <Route
                    path="/History"
                    exact
                    component={HistoryOfManage}
                ></Route>
                <Route path="/Setting" exact>
                    <Setting setUser={setUser} User={User} />
                </Route>
            </Switch>
        </>
    );
};

export default Manager;
