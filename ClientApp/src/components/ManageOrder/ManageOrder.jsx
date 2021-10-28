import React from "react";
import { useState } from "react";

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
                <div className="row-title">
                    <div>Index</div>
                    <div>Name</div>
                    <div>Time</div>
                    <div>Address</div>
                    <div>Total</div>
                    <div>Status</div>
                    <div>Delete</div>
                </div>
                <div className="line1"></div>
                <div className="manage-list-order">
                    <div className="row-title" onClick={HandleShowDetail}>
                        <div>1</div>
                        <div>Anh</div>
                        <div>28/11/2021</div>
                        <div>VietNam</div>
                        <div>500000d</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                    <div className="row-title">
                        <div>2</div>
                        <div>Anh</div>
                        <div>28/11/2021</div>
                        <div>VietNam</div>
                        <div>500000d</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                    <div className="row-title">
                        <div>3</div>
                        <div>Anh</div>
                        <div>28/11/2021</div>
                        <div>VietNam</div>
                        <div>500000d</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                    <div className="row-title">
                        <div>4</div>
                        <div>Anh</div>
                        <div>28/11/2021</div>
                        <div>VietNam</div>
                        <div>500000d</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                    <div className="row-title">
                        <div>5</div>
                        <div>Anh</div>
                        <div>28/11/2021</div>
                        <div>VietNam</div>
                        <div>500000d</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                    <div className="row-title">
                        <div>6</div>
                        <div>Anh</div>
                        <div>28/11/2021</div>
                        <div>VietNam</div>
                        <div>500000d</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
            <div className={Disable} onClick={HandleCancelShowDetail}></div>
            {Detail === true ? (
                <div className="order-detail">
                    <i
                        class="fas fa-times-circle"
                        onClick={HandleCancelShowDetail}
                    ></i>
                    <div className="dashboard-title">Order Details</div>
                    <div className="order-detail-info">
                        <div className="order-detail-info1">
                            <div>Name: Anh</div>
                            <div>Phone number: 0123</div>
                            <div>Address: Viet nam</div>
                        </div>
                        <div className="order-detail-info2">
                            <div>Type of payment: Cash</div>
                            <div>Status: Paid</div>
                        </div>
                    </div>
                    <div className="row-title">
                        <div>Food</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div>Order note</div>
                    </div>
                    <div className="line"></div>
                    <div className="order-detail-list">
                        <div className="row-title">
                            <div>Hu tieu</div>
                            <div>2</div>
                            <div>15000</div>
                            <div>it nuoc</div>
                        </div>
                        <div className="row-title">
                            <div>Coca</div>
                            <div>2</div>
                            <div>15000</div>
                            <div></div>
                        </div>
                        <div className="row-title">
                            <div>Banh mi</div>
                            <div>1</div>
                            <div>20000</div>
                            <div>nhieu tuong ot</div>
                        </div>
                        <div className="row-title">
                            <div>pepsi</div>
                            <div>1</div>
                            <div>15000</div>
                            <div>nhieu da</div>
                        </div>
                        <div className="row-title">
                            <div>Hu tieu</div>
                            <div>2</div>
                            <div>15000</div>
                            <div>it nuoc</div>
                        </div>
                        <div className="row-title">
                            <div>Coca</div>
                            <div>2</div>
                            <div>15000</div>
                            <div></div>
                        </div>
                        <div className="row-title">
                            <div>Banh mi</div>
                            <div>1</div>
                            <div>20000</div>
                            <div>nhieu tuong ot</div>
                        </div>
                        <div className="row-title">
                            <div>pepsi</div>
                            <div>1</div>
                            <div>15000</div>
                            <div>nhieu da</div>
                        </div>
                    </div>
                    <div className="line1"></div>
                    <div className="order-detail-total">
                        <div>Total</div>
                        <div>1000000</div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ManageOrder;
