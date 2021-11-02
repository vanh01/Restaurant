import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './css/order.css'
import './css/navbar.css'
import './css/dashboard.css'
import './css/setting.css'
import './css/style.css'
import './css/manage-order.css'
import NavbarCustomer from './components/Navbar/NavbarCustomer';
import Ordering from './components/Order/Ordering';
import DashBoard from './components/DashBoard/DashBoard';
import Setting from './components/Setting/Setting';
import NavbarClerk from './components/Navbar/NavbarClerk';
import ManageOrder from './components/ManageOrder/ManageOrder';

export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
        <>
            {/* <NavbarClerk />
            <Switch>
                <Route path="/" exact component={ManageOrder}></Route>
                <Route path="/Setting" exact component={Setting}></Route>
            </Switch> */}
            <NavbarCustomer />
            <Switch>
                <Route path="/" exact component={Ordering}></Route>
                <Route path="/DashBoard" exact component={DashBoard}></Route>
                <Route path="/Setting" exact component={Setting}></Route>
            </Switch>
        </>
    );
  }
}
