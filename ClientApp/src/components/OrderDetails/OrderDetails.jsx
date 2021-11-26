import React from "react";

const OrderDetails = ({
    Ordered,
    listFoodsOrdered,
    HandleCancelShowDetail,
}) => {
    return (
        <>
            <div className="order-detail">
                <i
                    className="fas fa-times-circle"
                    onClick={HandleCancelShowDetail}
                ></i>
                <div className="history-title">Order Details</div>
                <div className="line"></div>
                <div className="order-detail-info">
                    <div className="order-detail-info1">
                        <div>Name: {Ordered.fName}</div>
                        <div>Phone number: {Ordered.phoneNumber}</div>
                        <div>Address: {Ordered.address}</div>
                    </div>
                    <div className="order-detail-info2">
                        <div>Type of payment: {Ordered.paytype}</div>
                        <div>Time: {Ordered.date}</div>
                        <div>Status: {Ordered.available}</div>
                    </div>
                </div>
                <div className="order-detail-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Food</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Order note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listFoodsOrdered.map((food, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{food.name}</td>
                                        <td>{food.quantity}</td>
                                        <td>{food.price}</td>
                                        <td>{food.orderNote}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="line1"></div>
                <div className="order-detail-total">
                    <div>Total</div>
                    <div>{Ordered.total}</div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
