import React from "react";
import "../../css/navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavbarCustomer = ({ setUser }) => {
    const [navFull, setnavFull] = useState("nav-bar");
    return (
        <>
            <div className="nav-behind"></div>
            <nav className={navFull}>
                <div className="logo">
                    <i className="fas fa-store"></i>
                    <span>POS</span>
                </div>
                <NavLink
                    activeClassName="active"
                    exact
                    to="/"
                    onClick={() => setnavFull("nav-bar")}
                >
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-home-alt"></i>
                        <span>Order</span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="active"
                    exact
                    to="/History"
                    onClick={() => setnavFull("nav-bar")}
                >
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-history"></i>
                        <span>History</span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="active"
                    exact
                    to="/Setting"
                    onClick={() => setnavFull("nav-bar")}
                >
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-cog"></i>
                        <span>Setting</span>
                    </div>
                </NavLink>
                <NavLink
                    className="logout"
                    exact
                    to="/Login"
                    onClick={() => {
                        localStorage.setItem("type", "");
                        localStorage.setItem("userName", "");
                        localStorage.setItem("password", "");
                        setUser({});
                    }}
                >
                    <div>
                        <i className="fas fa-sign-out"></i>
                        <span>Logout</span>
                    </div>
                </NavLink>
                <div
                    className="show-nav"
                    onClick={() => {
                        if (navFull === "nav-bar") setnavFull("nav-bar active");
                        else setnavFull("nav-bar");
                    }}
                >
                    <i
                        className={
                            navFull === "nav-bar"
                                ? "fas fa-bars"
                                : "fas fa-times"
                        }
                    ></i>
                </div>
            </nav>
        </>
    );
};

export default NavbarCustomer;
