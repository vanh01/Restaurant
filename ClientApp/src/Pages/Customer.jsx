import React from "react";
import { Route, Switch } from "react-router";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import OrderingAndPayment from "../components/Order/OrderingAndPayment";
import History from "../components/History/History";
import Setting from "../components/Setting/Setting";
import HomeCustomer from "../components/Home/HomeCustomer";

const Customer = ({ setUser, User }) => {
    return (
        <>
            <NavbarCustomer setUser={setUser} />
            <Switch>
                <Route path="/" exact component={HomeCustomer}></Route>
                <Route
                    path="/Ordering"
                    exact
                    component={OrderingAndPayment}
                ></Route>
                <Route path="/History" exact component={History}></Route>
                <Route path="/Setting" exact>
                    <Setting User={User} />
                </Route>
            </Switch>
        </>
    );
};

export default Customer;
