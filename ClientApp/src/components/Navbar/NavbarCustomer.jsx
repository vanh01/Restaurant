import React from "react";
import "../../css/navbar.css";
import { NavLink } from "react-router-dom";

const NavbarCustomer = () => {
    return (
        <>
            <div className="nav-behind"></div>
            <nav className="nav-bar">
                <div>
                    <i className="fas fa-store"></i>
                </div>
                <NavLink activeClassName="active" to="/Ordering">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-home-alt"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" to="/History">
                    <b></b>
                    <b></b>
                    <div>
                        <i class="fas fa-history"></i>
                    </div>
                </NavLink>
                <NavLink activeClassName="active" to="/Setting">
                    <b></b>
                    <b></b>
                    <div>
                        <i className="fas fa-cog"></i>
                    </div>
                </NavLink>
                <NavLink to="/Home">
                    <div>
                        <i className="fas fa-sign-out"></i>
                    </div>
                </NavLink>
            </nav>
        </>
    );
};

export default NavbarCustomer;
