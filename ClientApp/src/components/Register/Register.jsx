import React from "react";
import "../../css/register.css";
import { NavLink } from "react-router-dom";

const Register = () => {
    return (
        <>
            <div className="register">
                <div className="register-form">
                    <NavLink to="/" exact>
                        <i className="fas fa-store"></i>
                    </NavLink>
                    <div>
                        <div>
                            <div>
                                First Name
                                <input type="text" />
                            </div>
                            <div>
                                Last Name
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            Username
                            <input type="text" />
                        </div>
                        <div>
                            Password
                            <input type="password" />
                        </div>
                    </div>
                    <NavLink className="loginbtn" to="/" exact>
                        <button>Register</button>
                    </NavLink>
                    <NavLink className="loginreg" to="/Login" exact>
                        <button>Login</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Register;
