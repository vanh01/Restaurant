import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    function HandleOnClick(e) {
        // let list = document.querySelectorAll(".nav-item");
        // for (let i = 0; i < list.length; i++) {
        //     list[i].className = "nav-item";
        // }
        // e.target.className = "nav-item active";
    }

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
                        <Link to="/DashBoard">
                            <i className="fas fa-chart-pie-alt"></i>
                            <span>Dash board</span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <a href="/History">
                            <i class="fas fa-history"></i>
                            <span>History</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#">
                            <i className="fas fa-bell"></i>
                            <span>Notify</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#">
                            <i className="fas fa-envelope"></i>
                            <span>Message</span>
                        </a>
                    </li> */}
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

export default Navbar;
