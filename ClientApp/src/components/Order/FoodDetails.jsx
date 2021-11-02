import React from "react";
import { useState } from "react";

const FoodDetails = ({
    HandleCancelShowFoodDetails,
    setlistOrderFood,
    FoodCur,
}) => {
    const [Quantity, setQuantity] = useState(1);
    const [NoteFood, setNoteFood] = useState("");

    return (
        <>
            <div className="food-detail">
                <div className="food-detail1">
                    <img
                        className="image-food"
                        src="https://image.shutterstock.com/image-photo/chopsticks-holding-chinese-noddles-yakisoba-260nw-1021242892.jpg"
                        alt="test"
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
                                    noteFood: NoteFood,
                                },
                            ]);
                        }}
                    ></i>
                    <div className="food-detail-info1">Hủ tiếu</div>
                    <div className="food-detail-info2">
                        Hủ tiếu dai ngon từng sợi
                    </div>
                    <div className="food-detail-info3">
                        25000đ
                        <input
                            type="text"
                            defaultValue="1"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Order Note..."
                        onChange={(e) => setNoteFood(e.target.value)}
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
