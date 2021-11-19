import React from "react";

const Items = ({ listOrderFood, setlistOrderFood, CalcTotal }) => {
    CalcTotal();

    return (
        <>
            {listOrderFood.map((orderFood) => {
                return (
                    <div className="ordering-cart-item">
                        <img src={orderFood.pathImg} alt={orderFood.name} />
                        <div className="item-name">{orderFood.name}</div>
                        <div className="item-price">{orderFood.price}đ</div>
                        <input
                            className="item-quantity"
                            type="text"
                            defaultValue={orderFood.quantity}
                            onChange={(e) => {
                                orderFood.quantity = e.target.value;
                                CalcTotal();
                            }}
                        />
                        <div className="item-total">
                            {orderFood.price * orderFood.quantity}đ
                        </div>
                        <button
                            className="item-remove-item"
                            onClick={() => {
                                var temp = [...listOrderFood];
                                var index = temp.indexOf(orderFood);
                                temp.splice(index, 1);
                                setlistOrderFood(() => [...temp]);
                                CalcTotal();
                            }}
                        >
                            <i className="far fa-trash-alt"></i>
                        </button>

                        {orderFood.orderNote === "" ? (
                            <input
                                className="item-note"
                                type="text"
                                placeholder="Order Note..."
                                onChange={(e) => {
                                    orderFood.orderNote = e.target.value;
                                }}
                            />
                        ) : (
                            <input
                                className="item-note"
                                type="text"
                                defaultValue={orderFood.orderNote}
                                onChange={(e) => {
                                    orderFood.orderNote = e.target.value;
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default Items;
