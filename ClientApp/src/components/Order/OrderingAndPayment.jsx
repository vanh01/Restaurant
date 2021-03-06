import React from "react";
import "../../css/order.css";
import CartItems from "./CartItems";
import Foods from "./Foods";
import { useState, useEffect } from "react";
import FoodDetails from "./FoodDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderingAndPayment = ({ User }) => {
    const [listOrderFood, setlistOrderFood] = useState([]);
    const [Search, setSearch] = useState("");
    const [Disable, setDisable] = useState("hide");
    const [Disable1, setDisable1] = useState("hide");
    const [FoodCur, setFoodCur] = useState({});
    const [PaymentFull, setPaymentFull] = useState(false);
    const [PaymentMethod, setPaymentMethod] = useState("Card");
    const [ShowFoodDetails, setShowFoodDetails] = useState(false);
    const [Total, setTotal] = useState(0);
    const [Category, setCategory] = useState("Category");
    const [listMenuFood, setlistMenuFood] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    var current = new Date();
    var date = `${current.getDate()}-${
        current.getMonth() + 1
    }-${current.getFullYear()}`;

    const [info, setinfo] = useState({
        name: User.lName + User.fName,
        address: User.address,
        phoneNumber: User.phoneNumber,
    });
    const notify = (s) => {
        toast.success(s, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const notify1 = (s) => {
        toast.warn(s, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const loadMenuFoods = async () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        await fetch("https://localhost:5001/api/food", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setlistMenuFood(result);
            })
            .catch((error) => console.log("error", error));

        await fetch("https://localhost:5001/api/food/category", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setlistCategory(result);
            })
            .catch((error) => console.log("error", error));
        return;
    };

    useEffect(() => {
        loadMenuFoods();
    }, []);

    const CalcTotal = () => {
        let tempTotal = 0;
        listOrderFood.map((orderFood) => {
            tempTotal += Number(orderFood.price) * Number(orderFood.quantity);
        });
        setTotal(tempTotal);
    };

    const Payment = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var current = new Date();
        var date = `${current.getDate()}-${
            current.getMonth() + 1
        }-${current.getFullYear()}`;

        var raw = JSON.stringify({
            customerID: localStorage.getItem("id"),
            date: date,
            paytype: PaymentMethod,
            total: Total.toString(),
            name: info.name,
            address: info.address,
            phoneNumber: info.phoneNumber,
            inforFoods: listOrderFood,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/order/ordered?userName=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") {
                    notify("Success!");
                    setlistOrderFood([]);
                    setTotal(0);
                } else
                    toast.error("Fail!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            })
            .catch((error) => console.log("error", error));
    };

    function HandleOnInput(e) {
        setSearch(e.target.value);
    }

    function HandleShowFoodDetails() {
        setDisable1("hide hide1");
        setShowFoodDetails(true);
    }

    function HandleCancelShowFoodDetails() {
        setDisable1("hide");
        setShowFoodDetails(false);
    }

    function HandleContinuePayment() {
        setPaymentFull(true);
        setDisable("hide hide1");
    }

    function HandleCancelPayment() {
        setPaymentFull(false);
        setDisable("hide");
    }

    return (
        <>
            <div className="ordering-payment">
                <div className="ordering-menu">
                    <div className="ordering-menu-header">
                        <div className="title">Hi, {User.fName}</div>
                        <div className="title2">Today: {date}</div>
                        <input
                            className="input-search"
                            type="text"
                            placeholder="Search for food, coffe, etc..."
                            value={Search}
                            onChange={HandleOnInput}
                        />
                    </div>
                    <div className="line"></div>
                    <div className="ordering-menu-item">
                        <div className="title">Choose dishes</div>
                        <select
                            name="Category"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                console.log(e.target.value);
                            }}
                        >
                            <option defaultValue="Category">Category</option>
                            {listCategory.map((pram, index) => {
                                return (
                                    <option key={index} value={pram}>
                                        {pram}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="ordering-menu-list-food">
                            <Foods
                                listMenuFood={listMenuFood}
                                search={Search}
                                HandleShowFoodDetails={HandleShowFoodDetails}
                                setFoodCur={setFoodCur}
                                Category={Category}
                            />
                        </div>
                    </div>
                </div>
                <div className={Disable} onClick={HandleCancelPayment}></div>
                <div className="ordering-cart-behind"></div>
                {/*  */}

                {!PaymentFull ? (
                    <div className="ordering-cart">
                        <div className="ordering-cart-1">
                            <div className="ordering-cart-header">
                                <div className="title">Order</div>
                                <div className="title2">Items</div>
                            </div>
                            <div className="line"></div>
                            <div className="ordering-cart-list-item">
                                <CartItems
                                    listOrderFood={listOrderFood}
                                    setlistOrderFood={setlistOrderFood}
                                    CalcTotal={CalcTotal}
                                />
                            </div>

                            <div className="line1"></div>
                            <div className="ordering-cart-1-payment">
                                <div className="title2">Sub total</div>
                                <div className="title3">{Total}??</div>
                                <button
                                    className="ordering-cart-1-payment-button"
                                    onClick={HandleContinuePayment}
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="ordering-cart ordering-cart-full">
                        <div className="ordering-cart-1 ordering-cart-1-1">
                            <div className="ordering-cart-header">
                                <div className="title">Confirmation</div>
                                <div className="title2">Order</div>
                            </div>
                            <div className="line"></div>
                            <div className="ordering-cart-list-item ordering-cart-list-item1">
                                <CartItems
                                    listOrderFood={listOrderFood}
                                    setlistOrderFood={setlistOrderFood}
                                    CalcTotal={CalcTotal}
                                />
                            </div>

                            <div className="line1"></div>
                            <div className="ordering-cart-1-payment ordering-cart-1-payment1">
                                <div className="title2">Sub total</div>
                                <div className="title3">{Total}??</div>
                            </div>
                        </div>
                        <div className="line2"></div>
                        <form className="ordering-cart-2" onSubmit={Payment}>
                            <div className="ordering-cart-header">
                                <div className="title">Payment</div>
                                <div className="title2">
                                    2 payment method available
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="ordering-methodss">
                                <div className="title1">Payment method</div>
                                <div className="ordering-methods">
                                    <div
                                        className={
                                            PaymentMethod === "Card"
                                                ? "ordering-method ordering-method1"
                                                : "ordering-method"
                                        }
                                        onClick={() => {
                                            setPaymentMethod("Card");
                                        }}
                                    >
                                        <i className="fal fa-credit-card"></i>
                                        <div>Credit card</div>
                                    </div>
                                    <div
                                        className={
                                            PaymentMethod === "Cash"
                                                ? "ordering-method ordering-method1"
                                                : "ordering-method"
                                        }
                                        onClick={() => {
                                            setPaymentMethod("Cash");
                                        }}
                                    >
                                        <i className="far fa-wallet"></i>
                                        <div>Cash</div>
                                    </div>
                                </div>

                                {PaymentMethod === "Card" ? (
                                    <>
                                        <div className="ordering-infor">
                                            Name
                                            <input
                                                type="text"
                                                required
                                                defaultValue={info.name}
                                                onChange={(e) =>
                                                    setinfo({
                                                        ...info,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="ordering-infor">
                                            Address
                                            <input
                                                type="text"
                                                required
                                                defaultValue={info.address}
                                                onChange={(e) =>
                                                    setinfo({
                                                        ...info,
                                                        address: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="ordering-infor">
                                            Phone Number
                                            <input
                                                type="text"
                                                required
                                                defaultValue={info.phoneNumber}
                                                onChange={(e) =>
                                                    setinfo({
                                                        ...info,
                                                        phoneNumber:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="ordering-infor">
                                            Card Number
                                            <input
                                                type="text"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="ordering-infor">
                                            Name
                                            <input
                                                type="text"
                                                required
                                                defaultValue={info.name}
                                                onChange={(e) =>
                                                    setinfo({
                                                        ...info,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="ordering-infor">
                                            Address
                                            <input
                                                type="text"
                                                required
                                                defaultValue={info.address}
                                                onChange={(e) =>
                                                    setinfo({
                                                        ...info,
                                                        address: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="ordering-infor">
                                            Phone Number
                                            <input
                                                type="text"
                                                required
                                                defaultValue={info.phoneNumber}
                                                onChange={(e) =>
                                                    setinfo({
                                                        ...info,
                                                        phoneNumber:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="ordering-cart-2-btn">
                                <button onClick={HandleCancelPayment}>
                                    Cancel
                                </button>
                                <button type="submit">Payment</button>
                            </div>
                        </form>
                    </div>
                )}
                {!PaymentFull && (
                    <div className="show-cart" onClick={HandleContinuePayment}>
                        <i className="fas fa-cart-plus"></i>
                    </div>
                )}
            </div>
            <div
                className={Disable1}
                onClick={HandleCancelShowFoodDetails}
            ></div>
            {ShowFoodDetails && (
                <FoodDetails
                    HandleCancelShowFoodDetails={HandleCancelShowFoodDetails}
                    setlistOrderFood={setlistOrderFood}
                    FoodCur={FoodCur}
                    notify={notify}
                    notify1={notify1}
                    listOrderFood={listOrderFood}
                />
            )}
            <ToastContainer />
        </>
    );
};

export default OrderingAndPayment;
