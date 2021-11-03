import React from "react";
import { Link } from "react-router-dom";

const NavbarClerk = () => {
    return (
        <>
            <div className="nav-behind"></div>
            <nav className="nav-bar">
                <ul>
                    <li>
                        <i className="fas fa-store"></i>
                    </li>
                    <li className="active">
                        <b></b>
                        <b></b>
                        <div>
                            <Link to="/">
                                <i className="fas fa-home-alt"></i>
                            </Link>
                        </div>
                    </li>
                    <li className="">
                        <b></b>
                        <b></b>
                        <div>
                            <Link to="/Setting">
                                <i className="fas fa-cog"></i>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <Link to="/Home">
                                <i className="fas fa-sign-out"></i>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default NavbarClerk;
