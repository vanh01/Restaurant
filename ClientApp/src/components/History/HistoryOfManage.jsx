import React from "react";
import "../../css/history-of-manage.css";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

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
                            <tr
                                onClick={() => {
                                    setDisable("hide hide1");
                                }}
                            >
                                <td>1</td>
                                <td>Anh</td>
                                <td>Viet nam</td>
                                <td>0123</td>
                                <td>11/10/2021</td>
                                <td>Cash</td>
                                <td>15000d</td>
                            </tr>
                            <tr
                                onClick={() => {
                                    setDisable("hide hide1");
                                }}
                            >
                                <td>1</td>
                                <td>Anh</td>
                                <td>Viet nam</td>
                                <td>0123</td>
                                <td>11/10/2021</td>
                                <td>Cash</td>
                                <td>15000d</td>
                            </tr>
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
            {Disable !== "hide" ? (
                <OrderDetails HandleCancelShowDetail={HandleCancelShowDetail} />
            ) : (
                <></>
            )}
        </>
    );
};

export default HistoryOfManage;
