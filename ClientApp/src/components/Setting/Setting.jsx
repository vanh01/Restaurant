import React from "react";
import { useEffect, useState } from "react";
import "../../css/setting.css";

const Setting = ({ setUser, User }) => {
    const [AccountTemp, setAccountTemp] = useState({});

    useEffect(() => {
        var requestOptions = {
            method: "GET",
        };

        fetch(
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
    }, []);

    const UpdateAccount1 = () => {
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

        fetch("https://localhost:5001/api/account", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
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
                            }}
                        >
                            Save changes
                        </button>
                        <button onClick={() => setAccountTemp({})}>
                            Dismiss
                        </button>
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
                            <input type="password" defaultValue="" />
                        </div>
                        <div>
                            New password
                            <input type="password" />
                        </div>
                        <div>
                            Confirm password
                            <input type="password" />
                        </div>
                        <button>Change password</button>
                        <button>Dismiss</button>
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
            </div>
        </>
    );
};

export default Setting;
