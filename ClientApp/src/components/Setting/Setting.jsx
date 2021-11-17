import React from "react";
import { useEffect, useState } from "react";
import "../../css/setting.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = ({ setUser, User }) => {
    const [AccountTemp, setAccountTemp] = useState({});
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [Password1, setPassword1] = useState("");
    const [Password2, setPassword2] = useState("");

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
    const notify1 = () => {
        toast.error("Fail!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const fetchData = async () => {
        var requestOptions = {
            method: "GET",
        };

        await fetch(
            "https://localhost:5001/api/account/login?username=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
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
                setAccountTemp(result);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const UpdateAccount1 = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            id: User.id,
            userName: AccountTemp.userName,
            password: AccountTemp.password,
            fName: AccountTemp.fName,
            lName: AccountTemp.lName,
            birthOfDate: AccountTemp.birthOfDate,
            address: AccountTemp.address,
            phoneNumber: AccountTemp.phoneNumber,
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch("https://localhost:5001/api/account", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    const UpdateAccount2 = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userName: User.userName,
            password: localStorage.getItem("password"),
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://localhost:5001/api/account/password?newPassword=" +
                Password1,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                if (result === "Success") {
                    notify();
                    localStorage.setItem("password", Password1);
                } else notify1();
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <>
            <div className="setting">
                <div className="settingg">
                    <div className="setting-info">
                        <div>
                            First name
                            <input
                                type="text"
                                defaultValue={User.fName}
                                onChange={(e) => {
                                    AccountTemp.fName = e.target.value;
                                }}
                            />
                        </div>
                        <div>
                            Last name
                            <input
                                type="text"
                                defaultValue={User.lName}
                                onChange={(e) => {
                                    AccountTemp.lName = e.target.value;
                                }}
                            />
                        </div>
                        <div>
                            Date of birth
                            <input
                                type="date"
                                className="date-of-birth"
                                defaultValue={User.birthOfDate}
                                onChange={(e) => {
                                    AccountTemp.birthOfDate = e.target.value;
                                    console.log(typeof e.target.value);
                                    console.log(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            Address
                            <input
                                type="text"
                                defaultValue={User.address}
                                onChange={(e) => {
                                    AccountTemp.address = e.target.value;
                                }}
                            />
                        </div>
                        <div>
                            Phone number
                            <input
                                type="text"
                                defaultValue={User.phoneNumber}
                                onChange={(e) => {
                                    AccountTemp.phoneNumber = e.target.value;
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                UpdateAccount1();
                                notify();
                            }}
                        >
                            Save changes
                        </button>
                        {/* <button>Dismiss</button> */}
                    </div>
                    <div className="setting-password">
                        <div>
                            Username
                            <input
                                readOnly
                                type="text"
                                defaultValue={User.userName}
                            />
                        </div>
                        <div>
                            Current password
                            <input
                                type="password"
                                defaultValue=""
                                autoComplete="off"
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            New password
                            <input
                                type="password"
                                onChange={(e) => setPassword1(e.target.value)}
                            />
                        </div>
                        <div>
                            Confirm password
                            <input
                                type="password"
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => {
                                console.log(Password1);
                                console.log(Password2);
                                console.log(CurrentPassword);
                                console.log(localStorage.getItem("password"));
                                if (
                                    Password1 !== Password2 ||
                                    CurrentPassword !==
                                        localStorage.getItem("password")
                                ) {
                                    notify1();
                                } else {
                                    UpdateAccount2();
                                }
                            }}
                        >
                            Change password
                        </button>
                        {/* <button>Dismiss</button> */}
                    </div>
                </div>
                <div className="setting-avatar">
                    <div className="title">Profile picture</div>
                    <div className="picture"></div>
                    <label className="edit">
                        <input type="file" />
                        <i className="fas fa-pen"></i>Edit
                    </label>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Setting;
