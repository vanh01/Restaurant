import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './css/order.css'
import './css/navbar.css'
import './css/history.css'
import './css/setting.css'
import './css/style.css'
import './css/manage-order.css'
import './css/edit-menu.css'
import './css/manage-account.css'
import NavbarCustomer from './components/Navbar/NavbarCustomer';
import OrderingAndPayment from './components/Order/OrderingAndPayment';
import History from './components/DashBoard/History';
import Setting from './components/Setting/Setting';
import NavbarClerk from './components/Navbar/NavbarClerk';
import ManageOrder from './components/ManageOrder/ManageOrder';
import NavbarManager from './components/Navbar/NavbarManager';
import EditMenu from './components/EditMenu/EditMenu';
import ManageAccount from './components/ManageAccount/ManageAccount';
export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                {/* <NavbarClerk />
            <Switch>
                <Route path="/ManageOrder" exact component={ManageOrder}></Route>
                <Route path="/Setting" exact component={Setting}></Route>
            </Switch> */}
                {/* <NavbarCustomer />
                <Switch>
                    <Route path="/Ordering" exact component={OrderingAndPayment}></Route>
                    <Route path="/History" exact component={History}></Route>
                    <Route path="/Setting" exact component={Setting}></Route>
                </Switch> */}
                <NavbarManager />
                <Switch>
                    <Route path="/EditMenu" exact component={EditMenu}></Route>
                    <Route path="/ManageAccount" exact component={ManageAccount}></Route>
                    <Route path="/Setting" exact component={Setting}></Route>
                </Switch>
            </>
        );
    }
}
