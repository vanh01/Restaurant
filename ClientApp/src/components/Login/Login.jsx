import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "../../css/login.css";

const Login = ({ setUser }) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    let history = useHistory();
    // var UserTemp;
    function Submit() {
        var requestOptions = {
            method: "GET",
        };

        fetch(
            "https://localhost:5001/api/account/login?username=" +
                UserName +
                "&password=" +
                Password,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.typeOfUser === "Manager")
                    localStorage.setItem("type", "Manager");
                else if (result.typeOfUser === "Clerk")
                    localStorage.setItem("type", "Clerk");
                else if (result.typeOfUser === "Customer")
                    localStorage.setItem("type", "Customer");
                else localStorage.setItem("type", "");
                setUser(result);
                localStorage.setItem("user", result);
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <>
            <div className="login">
                <div className="login-form">
                    <NavLink to="/" exact>
                        <i className="fas fa-store"></i>
                    </NavLink>
                    <div>
                        <div>
                            Username
                            <input
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            Password
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <NavLink exact to="/" className="loginbtn" onClick={Submit}>
                        <button>Login</button>
                    </NavLink>
                    <NavLink exact to="/Register" className="loginreg">
                        <button>Register</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Login;
