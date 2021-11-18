import React from "react";
import "../../css/history-of-manage.css";
import { useState, useEffect } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
// import listOrdered from "../../data/listOrdered";

const HistoryOfManage = () => {
    const [Disable, setDisable] = useState("hide");
    const [listOrdered, setlistOrdered] = useState([{}]);
    const [listFoodsOrdered, setlistFoodsOrdered] = useState([{}]);
    const [Ordered, setOrdered] = useState({})

    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/order/All?UserName=" +
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

    function HandleCancelShowDetail() {
        setDisable("hide");
    }

    return (
        <>
            <div className="history-of-manage">
                <div className="title">Ordered</div>
                <div className="title2">Monday 27 Sep, 2021</div>
                <div className="line"></div>
                <div className="table-ordered">
                    <table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Time</th>
                                <th>Type of payment</th>
                                <th>Total payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrdered.map((ordered, index) => {
                                if (ordered.available == "Ready") {
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
                                            <td>{index + 1}</td>
                                            <td>{ordered.fName}</td>
                                            <td>{ordered.address}</td>
                                            <td>{ordered.phoneNumber}</td>
                                            <td>{ordered.date}</td>
                                            <td>{ordered.paytype}</td>
                                            <td>{ordered.total}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className={Disable}
                onClick={() => {
                    setDisable("hide");
                }}
            ></div>
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

export default HistoryOfManage;
