import React, { useEffect, useState } from 'react';
import './css/style.css'
import Customer from './Pages/Customer';
import Clerk from './Pages/Clerk';
import Manager from './Pages/Manager';
import HomePage from './Pages/HomePage';

const App = () => {
    const [User, setUser] = useState({});

    const fetchData = async () => {
        var requestOptions = {
            method: "GET",
        };

        await fetch(
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
    };
    useEffect(() => {
        fetchData();
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