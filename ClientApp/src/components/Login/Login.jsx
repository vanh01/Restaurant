import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "../../css/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUser }) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    localStorage.setItem("type", "");
    let history = useHistory();
    // var UserTemp;
    async function Submit(e) {
        e.preventDefault();
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
                localStorage.setItem("id", result.id);
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
            toast.error("Your login information was incorrect.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <div className="login">
                <form className="login-form" onSubmit={Submit}>
                    <NavLink to="/" exact>
                        <i className="fas fa-store"></i>
                    </NavLink>
                    <div>
                        <div>
                            Username
                            <input
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            Password
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="loginbtn">
                        <button type="submit">Login</button>
                    </div>
                    <NavLink exact to="/Register" className="loginreg">
                        <button>Register</button>
                    </NavLink>
                </form>

                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
