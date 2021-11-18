import React from "react";
import "../../css/register.css";
import { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    let history = useHistory();
    const [AccountTemp, setAccountTemp] = useState({});

    const notify = () => {
        toast.success("Success!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const notify1 = (s) => {
        toast.error(s, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const register = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (AccountTemp.userName === null || AccountTemp.password === null) {
            notify1();
            return;
        }
        if (AccountTemp.userName === "" || AccountTemp.password === "") {
            notify1();
            return;
        }
        var raw = JSON.stringify({
            userName: AccountTemp.userName,
            password: AccountTemp.password,
            fName: AccountTemp.fName,
            lName: AccountTemp.lName,
            birthOfDate: "",
            address: "",
            phoneNumber: "",
            img: "",
            typeOfUser: "Customer",
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch("https://localhost:5001/api/account", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") {
                    notify();
                    history.replace("/Login");
                } else notify1("The account was in existence.");
            })
            .catch((error) => console.log("error", error));
    };

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
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        AccountTemp.fName = e.target.value;
                                    }}
                                />
                            </div>
                            <div>
                                Last Name
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        AccountTemp.lName = e.target.value;
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            Username
                            <input
                                type="text"
                                onChange={(e) => {
                                    AccountTemp.userName = e.target.value;
                                }}
                            />
                        </div>
                        <div>
                            Password
                            <input
                                type="password"
                                onChange={(e) => {
                                    AccountTemp.password = e.target.value;
                                }}
                            />
                        </div>
                    </div>
                    <div className="loginbtn" to="/Login" exact>
                        <button onClick={register}>Register</button>
                    </div>
                    <NavLink className="loginreg" to="/Login" exact>
                        <button onClick={() => setAccountTemp({})}>
                            Login
                        </button>
                    </NavLink>
                </div>

                <ToastContainer />
            </div>
        </>
    );
};

export default Register;
