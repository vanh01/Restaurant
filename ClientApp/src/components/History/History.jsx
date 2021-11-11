import React from "react";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

const History = () => {
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
            <div className="history">
                <div className="history-report">
                    <div className="history-header">
                        <div className="title">History</div>
                        <div className="title2">Monday 27 Sep, 2021</div>
                    </div>

                    <div className="line"></div>
                    <div className="history-order-report">
                        <div className="history-title">Order History</div>

                        <div className="row-title">
                            <div>Index</div>
                            <div>Time</div>
                            <div>Type of payment</div>
                            <div>Total payment</div>
                        </div>
                        <div className="line"></div>
                        <div className="history-list-order">
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
                    <div className="history-totals">
                        <div className="history-total">
                            <div>
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div className="history-num">11,521,000 đ</div>
                            <div className="history-tt">Total spending</div>
                        </div>
                        <div className="history-total">
                            <div>
                                <i class="fas fa-bookmark"></i>
                            </div>
                            <div className="history-num">3,230</div>
                            <div className="history-tt">Total ordered</div>
                        </div>
                        <div className="history-total">
                            <div>
                                <i class="fas fa-utensils-alt"></i>
                            </div>
                            <div className="history-num">15,140</div>
                            <div className="history-tt">Total dish ordered</div>
                        </div>
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

export default History;
