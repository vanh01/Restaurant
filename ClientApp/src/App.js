import React, { Component, useState } from 'react';
import './css/style.css'
import Customer from './Pages/Customer';
import Clerk from './Pages/Clerk';
import Manager from './Pages/Manager';
import Login from './Pages/Login';

const App = () => {
    let menu;
    const [User, setUser] = useState({});

    if (User.typeOfUser === "Customer")
        menu = <Customer setUser={setUser} User={User} />
    else if (User.typeOfUser === "Manager")
        menu = <Manager setUser={setUser} User={User} />
    else if(User.typeOfUser === "Clerk")
        menu = <Clerk setUser={setUser} User={User} />
    else
        menu = <Login setUser={setUser} />
         
        
    return (
        <>
            {menu}
        </>
    );
}

export default App;