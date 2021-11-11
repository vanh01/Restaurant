import React from "react";
import { useState } from "react";
import listAccount from "../../data/listAccount";

const ManageAccount = () => {
    const [Disable, setDisable] = useState("hide");
    const [Update, setUpdate] = useState(false);
    const [AccountTemp, setAccountTemp] = useState({});

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
                        {listAccount.map((account) => {
                            return (
                                <tr>
                                    <td>{account.userName}</td>
                                    <td>{account.password}</td>
                                    <td>{account.date}</td>
                                    <td>{account.name}</td>
                                    <td>{account.phoneNumber}</td>
                                    <td>
                                        <i
                                            class="fas fa-times"
                                            onClick={() => {
                                                setUpdate(!Update);
                                                var index =
                                                    listAccount.indexOf(
                                                        account
                                                    );
                                                listAccount.splice(index, 1);
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
                            listAccount.push(AccountTemp);
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
