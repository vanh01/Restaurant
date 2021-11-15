import React, { useEffect } from "react";
import "../../css/manage-account.css";
import { useState } from "react";

const ManageAccount = () => {
    const [Disable, setDisable] = useState("hide");
    const [Update, setUpdate] = useState(false);
    const [AccountTemp, setAccountTemp] = useState({});
    const [ListAccount, setListAccount] = useState([]);

    useEffect(() => {
        fetch("https://localhost:5001/api/account")
            .then((response) => response.json())
            .then((data) => setListAccount(data));
    }, []);

    return (
        <>
            <div className="manage-account">
                <div className="title">Account Management</div>
                <div className="line"></div>
                <div className="table-account">
                    <table>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Delete</th>
                        </tr>
                        {ListAccount.map((account) => {
                            return (
                                <tr>
                                    <td>{account.userName}</td>
                                    <td>{account.password}</td>
                                    <td>{account.birthOfDate}</td>
                                    <td>
                                        {account.lName + " " + account.fname}
                                    </td>
                                    <td>{account.phoneNumber}</td>
                                    <td>
                                        <i
                                            className="fas fa-times"
                                            onClick={() => {
                                                var listAccount = ListAccount;
                                                var index =
                                                    listAccount.indexOf(
                                                        account
                                                    );
                                                listAccount.splice(index, 1);
                                                setListAccount(listAccount);
                                                setUpdate(!Update);
                                                console.log(listAccount);
                                            }}
                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
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
                        placeholder="Name"
                        onChange={(e) => (AccountTemp.name = e.target.value)}
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
                            AccountTemp.date = "11/10/2021";
                            setListAccount((list) => [...list, AccountTemp]);
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
