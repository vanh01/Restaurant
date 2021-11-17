import React from "react";
import { Route, Switch } from "react-router";
import { useEffect } from "react";
import NavbarManager from "../components/Navbar/NavbarManager";
import EditMenu from "../components/EditMenu/EditMenu";
import ManageAccount from "../components/ManageAccount/ManageAccount";
import HistoryOfManage from "../components/History/HistoryOfManage";
import Setting from "../components/Setting/Setting";
import HomeManager from "../components/Home/HomeManager";

const Manager = ({ setUser, User }) => {
    useEffect(() => {
        var requestOptions = {
            method: "GET",
        };

        fetch(
            "https://localhost:5001/api/account/login?username=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.typeOfUser === "Manager")
                    localStorage.setItem("type", "Manager");
                else if (result.typeOfUser === "Clerk")
                    localStorage.setItem("type", "Clerk");
                else if (result.typeOfUser === "Customer")
                    localStorage.setItem("type", "Customer");
                else localStorage.setItem("type", "");
                setUser(result);
            })
            .catch((error) => console.log("error", error));
    }, []);

    return (
        <>
            <NavbarManager setUser={setUser} />
            <Switch>
                <Route path="/" exact component={HomeManager}></Route>
                <Route path="/EditMenu" exact component={EditMenu}></Route>
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
                    <Setting User={User} />
                </Route>
            </Switch>
        </>
    );
};

export default Manager;
