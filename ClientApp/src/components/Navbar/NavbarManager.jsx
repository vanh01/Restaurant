import React from "react";
import { NavLink } from "react-router-dom";

const NavbarManager = () => {
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
                        <i class="fas fa-chart-pie"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" exact to="/History">
                    <b></b>
                    <b></b>
                    <div>
                        <i class="fas fa-history"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" exact to="/ManageAccount">
                    <b></b>
                    <b></b>
                    <div>
                        <i class="fas fa-user"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" exact to="/Setting">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-cog"></i>
                    </div>
                </NavLink>
                <NavLink exact to="/out">
                    <div>
                        <i className="fas fa-sign-out"></i>
                    </div>
                </NavLink>
            </nav>
        </>
    );
};

export default NavbarManager;
