import React from "react";
import { useState } from "react";

const FoodDetails = ({
    HandleCancelShowFoodDetails,
    setlistOrderFood,
    FoodCur,
    notify,
    notify1,
    listOrderFood,
}) => {
    const [Quantity, setQuantity] = useState(1);
    const [OrderNote, setOrderNote] = useState("");

    const Check = (food) => {
        var contains = false;
        listOrderFood.map((f) => {
            if (f.name === food.name) contains = true;
        });
        return contains;
    };

    return (
        <>
            <div className="food-detail">
                <div className="food-detail1">
                    <img
                        className="image-food"
                        src={FoodCur.pathImg}
                        alt={FoodCur.name}
                    />
                </div>
                <div className="food-detail2">
                    <i
                        className="fas fa-cart-plus"
                        onClick={() => {
                            if (!Check(FoodCur)) {
                                notify("Success!");
                                setlistOrderFood((list) => [
                                    ...list,
                                    {
                                        ...FoodCur,
                                        quantity: Quantity,
                                        orderNote: OrderNote,
                                        id: FoodCur.id,
                                    },
                                ]);
                            } else notify1("The cart already has this food!");
                            HandleCancelShowFoodDetails();
                        }}
                    ></i>
                    <div className="food-detail-info1">{FoodCur.name}</div>
                    <div className="food-detail-info2">
                        {FoodCur.description}
                    </div>
                    <div className="food-detail-info3">
                        {FoodCur.price}đ
                        <input
                            type="text"
                            defaultValue="1"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Order Note..."
                        onChange={(e) => setOrderNote(e.target.value)}
                    />
                </div>
                <i
                    className="fas fa-times-circle"
                    onClick={HandleCancelShowFoodDetails}
                ></i>
            </div>
        </>
    );
};

export default FoodDetails;
