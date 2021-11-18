import React from "react";
import "../../css/home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="home">
                <div className="heading">
                    <h1 className="head">
                        WELCOME TO OUR <span>WEBSITE</span>
                    </h1>
                    <div className="btns">
                        <NavLink className="btn1" to="/Login">
                            Register
                        </NavLink>
                        <NavLink className="btn2" to="/Login">
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
