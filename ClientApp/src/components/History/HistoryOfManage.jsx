import React from "react";
import "../../css/history-of-manage.css";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import listOrdered from "../../data/listOrdered";

const HistoryOfManage = () => {
    const [Disable, setDisable] = useState("hide");

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
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => setDisable("hide hide1")}
                                    >
                                        <td>{index}</td>
                                        <td>{ordered.fName}</td>
                                        <td>{ordered.address}</td>
                                        <td>{ordered.phoneNumber}</td>
                                        <td>{ordered.time}</td>
                                        <td>{ordered.typeOfPayment}</td>
                                        <td>{ordered.total}VND</td>
                                    </tr>
                                );
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
                <OrderDetails HandleCancelShowDetail={HandleCancelShowDetail} />
            )}
        </>
    );
};

export default HistoryOfManage;
