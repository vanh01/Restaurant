import React, { useEffect, useState } from 'react';
import './css/style.css'
import Customer from './Pages/Customer';
import Clerk from './Pages/Clerk';
import Manager from './Pages/Manager';
import HomePage from './Pages/HomePage';

const App = () => {
    // let menu;
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
    
    // return (
    //     <>
    //         <Switch>
    //             <Route path="/" >
    //                 <HomePage/>
    //             </Route>
    //             <Route path="/Customer" >
    //                 <Customer setUser={setUser} User={User}  />
    //             </Route>
    //             <Route path="/Clerk" >
    //                 <Clerk setUser={setUser} User={User}  />
    //             </Route>
    //             <Route path="/Manager" >
    //                 <Manager setUser={setUser} User={User}  />
    //             </Route>
    //         </Switch>
    //     </>
    // );

    // return (
    //     <>
    //         {menu}
    //     </>
    // );
}

export default App;