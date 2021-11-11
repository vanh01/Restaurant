import React, { Component } from 'react';
import './css/style.css'
import Customer from './Pages/Customer';
import Clerk from './Pages/Clerk';
import Manager from './Pages/Manager';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                {/* <Customer/> */}
                <Clerk/>
                {/* <Manager/> */}
            </>
        );
    }
}
