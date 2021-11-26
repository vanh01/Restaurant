import React from "react";
import "../../css/manage-order.css";
import { useState, useEffect } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrder = () => {
    const [Disable, setDisable] = useState("hide");
    const [Update, setUpdate] = useState(false);
    const [listOrdered, setlistOrdered] = useState([{}]);
    const [listFoodsOrdered, setlistFoodsOrdered] = useState([{}]);
    const [Ordered, setOrdered] = useState({});
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
            "https://localhost:5001/api/order/all?UserName=" +
                localStorage.getItem("userName") +
                "&Password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setlistOrdered(result);
            })
            .catch((error) => console.log("error", error));
    }, []);

    const ShowFoodsOrdered = async (CustomerID, OrderID) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        await fetch(
            "https://localhost:5001/api/order/food?CustomerID=" +
                CustomerID +
                "&OrderID=" +
                OrderID +
                "&UserName=" +
                localStorage.getItem("userName") +
                "&Password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => setlistFoodsOrdered(result))
            .catch((error) => console.log("error", error));
    };

    const Confirm = async (ordered, Available) => {
        var requestOptions = {
            method: "PUT",
            redirect: "follow",
        };

        await fetch(
            "https://localhost:5001/api/order/confirm?Available=" +
                Available +
                "&OrderID=" +
                ordered.orderID +
                "&UserName=" +
                localStorage.getItem("userName") +
                "&Password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") {
                    notify();
                    var listTemp = listOrdered;
                    var index = listTemp.indexOf(ordered);
                    listTemp.splice(index, 1);
                    setlistOrdered(listTemp);
                    setUpdate(!Update);
                } else {
                    notify1();
                }
            })
            .catch((error) => console.log("error", error));
    };

    function HandleCancelShowDetail() {
        setDisable("hide");
    }

    return (
        <>
            <div className="manage-order">
                <div className="title">Manage Orders</div>
                <div className="line"></div>
                <div className="manage-list-order">
                    <table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Time</th>
                                <th>Total</th>
                                <th>Confirm</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrdered.map((ordered, index) => {
                                if (ordered.available === "Waitting") {
                                    return (
                                        <tr
                                            key={index}
                                            onClick={() => {
                                                ShowFoodsOrdered(
                                                    ordered.customerID,
                                                    ordered.orderID
                                                );
                                                setOrdered(ordered);
                                                setDisable("hide hide1");
                                            }}
                                        >
                                            <td>{index}</td>
                                            <td>{ordered.fName}</td>
                                            <td>{ordered.address}</td>
                                            <td>{ordered.date}</td>
                                            <td>{ordered.total}</td>
                                            <td>
                                                <i
                                                    className="fas fa-check"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        Confirm(
                                                            ordered,
                                                            "Ready"
                                                        );
                                                    }}
                                                ></i>
                                            </td>
                                            <td>
                                                <i
                                                    className="fas fa-times-circle"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        Confirm(
                                                            ordered,
                                                            "Dismiss"
                                                        );
                                                    }}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
            <div className={Disable} onClick={HandleCancelShowDetail}></div>

            {Disable !== "hide" && (
                <OrderDetails
                    Ordered={Ordered}
                    listFoodsOrdered={listFoodsOrdered}
                    HandleCancelShowDetail={HandleCancelShowDetail}
                />
            )}
        </>
    );
};

export default ManageOrder;
