import React from "react";
import "../../css/navbar.css";
import { NavLink } from "react-router-dom";

const NavbarManager = ({ setUser }) => {
    return (
        <>
            <div className="nav-behind"></div>
            <nav className="nav-bar">
                <div>
                    <i className="fas fa-store"></i>
                </div>
                <NavLink activeClassName="active" exact to="/">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-home-alt"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" exact to="/EditMenu">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-chart-pie"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" exact to="/History">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-history"></i>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="active"
                    exact
                    to="/ManageAccount"
                >
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-user"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" exact to="/Setting">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-cog"></i>
                    </div>
                </NavLink>
                <NavLink
                    exact
                    to="/Login"
                    onClick={() => {
                        localStorage.setItem("type", "");
                        setUser({});
                    }}
                >
                    <div>
                        <i className="fas fa-sign-out"></i>
                    </div>
                </NavLink>
            </nav>
        </>
    );
};

export default NavbarManager;
