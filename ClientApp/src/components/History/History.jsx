import React from "react";
import "../../css/history.css";
import { useState, useEffect } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

const History = () => {
    const [Disable, setDisable] = useState("hide");
    const [listOrdered, setlistOrdered] = useState([{}]);
    const [listFoodsOrdered, setlistFoodsOrdered] = useState([{}]);
    const [Ordered, setOrdered] = useState({});

    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/order/?UserName=" +
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
            <div className="history">
                <div className="history-report">
                    <div className="history-header">
                        <div className="title">History</div>
                        <div className="title2">Monday 27 Sep, 2021</div>
                    </div>

                    <div className="line"></div>
                    <div className="history-order-report">
                        <div className="history-title">Order History</div>
                        <div className="line"></div>
                        <div className="history-list-order">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Time</th>
                                        <th>Type of payment</th>
                                        <th>Total payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listOrdered.map((ordered, index) => {
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
                                                <td>{ordered.date}</td>
                                                <td>{ordered.paytype}</td>
                                                <td>{ordered.total}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="history-totals">
                        <div className="history-total">
                            <div>
                                <i className="fas fa-dollar-sign"></i>
                            </div>
                            <div className="history-num">11,521,000 đ</div>
                            <div className="history-tt">Total spending</div>
                        </div>
                        <div className="history-total">
                            <div>
                                <i className="fas fa-bookmark"></i>
                            </div>
                            <div className="history-num">3,230</div>
                            <div className="history-tt">Total ordered</div>
                        </div>
                        <div className="history-total">
                            <div>
                                <i className="fas fa-utensils-alt"></i>
                            </div>
                            <div className="history-num">15,140</div>
                            <div className="history-tt">Total dish ordered</div>
                        </div>
                    </div>
                </div>
            </div>
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

export default History;
