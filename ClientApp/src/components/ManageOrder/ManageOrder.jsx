import React from "react";
import "../../css/manage-order.css";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import listOrdered from "../../data/listOrdered";

const ManageOrder = () => {
    const [Disable, setDisable] = useState("hide");
    const [Detail, setDetail] = useState(false);

    function HandleShowDetail() {
        setDetail(true);
        setDisable("hide hide1");
    }

    function HandleCancelShowDetail() {
        setDetail(false);
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
                            {listOrdered.map((order, index) => {
                                return (
                                    <tr key={index} onClick={HandleShowDetail}>
                                        <td>{index}</td>
                                        <td>{order.fName}</td>
                                        <td>{order.address}</td>
                                        <td>{order.time}</td>
                                        <td>{order.total}</td>
                                        <td>
                                            <i
                                                class="fas fa-check"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert("Confirm");
                                                }}
                                            ></i>
                                        </td>
                                        <td>
                                            <i
                                                className="fas fa-times-circle"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert("hi");
                                                }}
                                            ></i>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={Disable} onClick={HandleCancelShowDetail}></div>

            {/* {Detail && (
                <OrderDetails HandleCancelShowDetail={HandleCancelShowDetail} />
            )} */}
        </>
    );
};

export default ManageOrder;
