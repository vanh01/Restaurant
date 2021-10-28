import React from "react";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

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

            {Detail ? (
                <OrderDetails HandleCancelShowDetail={HandleCancelShowDetail} />
            ) : undefined}
        </>
    );
};

export default ManageOrder;
