import React, { useEffect } from "react";
import "../../css/manage-account.css";
import { useState } from "react";

const ManageAccount = () => {
    const [Disable, setDisable] = useState("hide");
    const [Update, setUpdate] = useState(false);
    const [AccountTemp, setAccountTemp] = useState({});
    const [ListAccount, setListAccount] = useState([]);

    useEffect(() => {
        // fetch("https://localhost:5001/api/account/clerk")
        //     .then((response) => response.json())
        //     .then((data) => setListAccount(data));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userName: "admin",
            password: "admin",
        });

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://localhost:5001/api/account/clerk", requestOptions)
            .then((response) => response.json())
            .then((result) => setListAccount(result))
            .catch((error) => console.log("error", error));
    });

    return (
        <>
            <div className="manage-account">
                <div className="title">Account Management</div>
                <div className="line"></div>
                <div className="table-account">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListAccount.map((account, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{account.userName}</td>
                                        <td>{account.password}</td>
                                        <td>{account.birthOfDate}</td>
                                        <td>
                                            {account.lName +
                                                " " +
                                                account.fName}
                                        </td>
                                        <td>{account.phoneNumber}</td>
                                        <td>
                                            <i
                                                className="fas fa-times"
                                                onClick={() => {
                                                    var listAccount =
                                                        ListAccount;
                                                    var index =
                                                        listAccount.indexOf(
                                                            account
                                                        );
                                                    listAccount.splice(
                                                        index,
                                                        1
                                                    );
                                                    setListAccount(listAccount);
                                                    setUpdate(!Update);
                                                }}
                                            ></i>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div
                    className="create-account"
                    onClick={() => {
                        setDisable("hide hide1");
                    }}
                >
                    <i className="fas fa-plus"></i>
                </div>
            </div>
            <div
                className={Disable}
                onClick={() => {
                    setDisable("hide");
                }}
            ></div>
            {Disable !== "hide" ? (
                <div className="new-account">
                    <div className="title">Information</div>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) =>
                            (AccountTemp.userName = e.target.value)
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            (AccountTemp.password = e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => (AccountTemp.fName = e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => (AccountTemp.lName = e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        onChange={(e) =>
                            (AccountTemp.phoneNumber = e.target.value)
                        }
                    />
                    <button
                        onClick={() => {
                            setDisable("hide");
                            setAccountTemp({});
                            var current = new Date();
                            var date = `${current.getFullYear()}-${
                                current.getMonth() + 1
                            }-${current.getDate()}`;
                            AccountTemp.birthOfDate = date;
                            setListAccount((list) => [...list, AccountTemp]);
                            fetch("https://localhost:5001/api/account", {
                                method: "POST",
                                body: JSON.stringify({
                                    userName: AccountTemp.userName,
                                    password: AccountTemp.password,
                                    fName: AccountTemp.fName,
                                    lName: AccountTemp.lName,
                                    birthOfDate: AccountTemp.birthOfDate,
                                    address: "",
                                    phoneNumber: AccountTemp.phoneNumber,
                                    img: "IMG",
                                    typeOfUser: "Clerk",
                                }),
                                headers: {
                                    "Content-type":
                                        "application/json; charset=UTF-8",
                                },
                            });
                        }}
                    >
                        Confirm
                    </button>
                    <i
                        className="fas fa-times-circle"
                        onClick={() => {
                            setDisable("hide");
                        }}
                    ></i>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ManageAccount;
