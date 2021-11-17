import React, { useEffect } from "react";
import "../../css/manage-account.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAccount = ({ User }) => {
    const [Disable, setDisable] = useState("hide");
    const [Update, setUpdate] = useState(false);
    const [AccountTemp, setAccountTemp] = useState({});
    const [ListAccount, setListAccount] = useState([]);
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
    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/account/clerk?username=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => setListAccount(result))
            .catch((error) => console.log("error", error));
    }, []);

    const CreateAccount = async () => {
        var current = new Date();
        var date = `${current.getFullYear()}-${
            current.getMonth() + 1
        }-${current.getDate()}`;
        AccountTemp.birthOfDate = date;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userName: AccountTemp.userName,
            password: AccountTemp.password,
            fName: AccountTemp.fName,
            lName: AccountTemp.lName,
            birthOfDate: AccountTemp.birthOfDate,
            address: "",
            phoneNumber: AccountTemp.phoneNumber,
            img: "IMG",
            typeOfUser: "Clerk",
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
                    setListAccount((list) => [...list, AccountTemp]);
                } else notify1();
            })
            .catch((error) => console.log("error", error));
    };

    const DeleteAccount = async (account) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            userName: account.userName,
        });

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch("https://localhost:5001/api/account", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") notify();
                else notify1();
            })
            .catch((error) => console.log("error", error));
    };

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
                                                    DeleteAccount(account);
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
            <ToastContainer />
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
                            CreateAccount();
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
