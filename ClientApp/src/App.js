import React, { useEffect, useState } from 'react';
import './css/style.css'
import Customer from './Pages/Customer';
import Clerk from './Pages/Clerk';
import Manager from './Pages/Manager';
import HomePage from './Pages/HomePage';

const App = () => {
    const [User, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem("user") !== null)
            setUser(localStorage.getItem("user"));
    },[]
    );
    
    if (localStorage.getItem("type") === "Customer")
        return <Customer setUser={setUser} User={User} />
    else if (localStorage.getItem("type") === "Manager")
        return <Manager setUser={setUser} User={User} />
    else if(localStorage.getItem("type") === "Clerk")
        return <Clerk setUser={setUser} User={User} />
    else
        return <HomePage setUser={setUser} />
}

export default App;