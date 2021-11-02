import React from "react";

const FoodDetails = ({
    HandleCancelShowFoodDetails,
    setlistOrderFood,
    FoodCur,
}) => {
    return (
        <>
            <div className="food-details">
                <div className="food-details1">
                    <img
                        className="image-food"
                        src="https://image.shutterstock.com/image-photo/chopsticks-holding-chinese-noddles-yakisoba-260nw-1021242892.jpg"
                        alt="test"
                    />
                </div>
                <div className="food-details2">
                    <i
                        className="fas fa-cart-plus"
                        onClick={() => {
                            HandleCancelShowFoodDetails();
                            setlistOrderFood((list) => [
                                ...list,
                                {
                                    ...FoodCur,
                                    quantity: 1,
                                },
                            ]);
                        }}
                    ></i>
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
