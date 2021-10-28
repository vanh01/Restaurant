import React from "react";

const Items = ({ listOrderFood, setlistOrderFood, CalcTotal }) => {
    CalcTotal();

    return (
        <>
            {listOrderFood.map((orderFood) => {
                return (
                    <div className="ordering-cart-item">
                        <img
                            src={orderFood.pathImage}
                            alt={orderFood.nameFood}
                        />
                        <div className="item-name">{orderFood.nameFood}</div>
                        <div className="item-price">{orderFood.priceFood}đ</div>
                        <input
                            className="item-quantity"
                            type="text"
                            defaultValue="1"
                            onChange={(e) => {
                                orderFood.quantity = e.target.value;
                                CalcTotal();
                            }}
                        />
                        <div className="item-total">15000đ</div>
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
                        <input
                            className="item-note"
                            type="text"
                            placeholder="Order Note..."
                        />
                    </div>
                );
            })}
        </>
    );
};

export default Items;
