import React from "react";
import { useState } from "react";

const FoodDetails = ({
    HandleCancelShowFoodDetails,
    setlistOrderFood,
    FoodCur,
}) => {
    const [Quantity, setQuantity] = useState(1);
    const [OrderNote, setOrderNote] = useState("");

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
                            HandleCancelShowFoodDetails();
                            setlistOrderFood((list) => [
                                ...list,
                                {
                                    ...FoodCur,
                                    quantity: Quantity,
                                    orderNote: OrderNote,
                                },
                            ]);
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
