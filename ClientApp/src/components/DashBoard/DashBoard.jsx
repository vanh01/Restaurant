import React from "react";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

const DashBoard = () => {
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
            <div className="dashboard">
                <div className="dashboard-report">
                    <div className="dashboard-header">
                        <div className="title">DashBoard</div>
                        <div className="title2">Monday 27 Sep, 2021</div>
                    </div>

                    <div className="line"></div>
                    <div className="dashboard-order-report">
                        <div className="dashboard-title">Order History</div>

                        <div className="row-title">
                            <div>Index</div>
                            <div>Time</div>
                            <div>Type of Payment</div>
                            <div>Total Payment</div>
                        </div>
                        <div className="line"></div>
                        <div className="dashboard-list-order">
                            <div
                                className="row-title"
                                onClick={HandleShowDetail}
                            >
                                <div>1</div>
                                <div>23-10-2021</div>
                                <div>Cash</div>
                                <div>20000</div>
                            </div>
                            <div
                                className="row-title"
                                onClick={HandleShowDetail}
                            >
                                <div>2</div>
                                <div>23-10-2021</div>
                                <div>Credit card</div>
                                <div>100000</div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-totals">
                        <div className="dashboard-total">
                            <div>
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div className="dashboard-num">11,521,000 đ</div>
                            <div className="dashboard-tt">Total spending</div>
                        </div>
                        <div className="dashboard-total">
                            <div>
                                <i class="fas fa-bookmark"></i>
                            </div>
                            <div className="dashboard-num">3,230</div>
                            <div className="dashboard-tt">Total ordered</div>
                        </div>
                        <div className="dashboard-total">
                            <div>
                                <i class="fas fa-utensils-alt"></i>
                            </div>
                            <div className="dashboard-num">15,140</div>
                            <div className="dashboard-tt">
                                Total dish ordered
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-statistic">
                    <div className="dashboard-most-ordered">
                        <div className="dashboard-title">Most Ordered</div>
                        <div className="line"></div>
                    </div>
                    <div className="dashboard-most-type">
                        <div className="dashboard-title">
                            Most Type Of Payment
                        </div>
                        <div className="line"></div>
                    </div>
                </div>
            </div>
            <div className={Disable} onClick={HandleCancelShowDetail}></div>
            {Detail === true ? (
                <OrderDetails HandleCancelShowDetail={HandleCancelShowDetail} />
            ) : (
                <></>
            )}
        </>
    );
};

export default DashBoard;
