import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "../../css/login.css";

const Login = ({ setUser }) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    localStorage.setItem("type", "");
    let history = useHistory();
    // var UserTemp;
    async function Submit() {
        var requestOptions = {
            method: "GET",
        };

        await fetch(
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
            })
            .catch((error) => console.log("error", error));
        if (
            localStorage.getItem("type") !== "" &&
            localStorage.getItem("type") !== null
        ) {
            history.replace("/");
            localStorage.setItem("userName", UserName);
            localStorage.setItem("password", Password);
        } else {
            alert("sai thoong tin");
        }
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
                    <div className="loginbtn" onClick={Submit}>
                        <button>Login</button>
                    </div>
                    <NavLink exact to="/Register" className="loginreg">
                        <button>Register</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Login;
