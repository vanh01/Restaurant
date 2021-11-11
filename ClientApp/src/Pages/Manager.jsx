import React from "react";
import { Route, Switch } from "react-router";
import NavbarManager from "../components/Navbar/NavbarManager";
import EditMenu from "../components/EditMenu/EditMenu";
import ManageAccount from "../components/ManageAccount/ManageAccount";
import HistoryOfManage from "../components/History/HistoryOfManage";
import Setting from "../components/Setting/Setting";

const Manager = () => {
    return (
        <>
            <NavbarManager />
            <Switch>
                <Route path="/EditMenu" exact component={EditMenu}></Route>
                <Route
                    path="/ManageAccount"
                    exact
                    component={ManageAccount}
                ></Route>
                <Route
                    path="/History"
                    exact
                    component={HistoryOfManage}
                ></Route>
                <Route path="/Setting" exact component={Setting}></Route>
            </Switch>
        </>
    );
};

export default Manager;
