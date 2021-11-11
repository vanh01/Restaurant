import React from "react";
import { Route, Switch } from "react-router";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import OrderingAndPayment from "../components/Order/OrderingAndPayment";
import History from "../components/History/History";
import Setting from "../components/Setting/Setting";

const Customer = () => {
    return (
        <>
            <NavbarCustomer />
            <Switch>
                <Route
                    path="/Ordering"
                    exact
                    component={OrderingAndPayment}
                ></Route>
                <Route path="/History" exact component={History}></Route>
                <Route path="/Setting" exact component={Setting}></Route>
            </Switch>
        </>
    );
};

export default Customer;
