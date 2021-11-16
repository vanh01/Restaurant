import React from "react";
import "../../css/home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="home">
                <NavLink exact to="/Login">
                    Login
                </NavLink>
            </div>
        </>
    );
};

export default Home;
