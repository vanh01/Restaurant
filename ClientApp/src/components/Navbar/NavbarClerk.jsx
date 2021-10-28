import React from "react";
import { Link } from "react-router-dom";

const NavbarClerk = () => {
    function HandleOnClick(e) {}
    return (
        <>
            <div className="nav-behind"></div>
            <nav className="nav-bar">
                <ul>
                    <li className="nav-item">
                        <div>
                            <i className="fas fa-store"></i>
                        </div>
                    </li>
                    <li className="nav-item" onClick={HandleOnClick}>
                        <Link to="/">
                            <i className="fas fa-home-alt"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={HandleOnClick}>
                        <Link to="/Setting">
                            <i className="fas fa-cog"></i>
                            <span>Setting</span>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={HandleOnClick}>
                        <Link to="/Home">
                            <i className="fas fa-sign-out"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default NavbarClerk;
