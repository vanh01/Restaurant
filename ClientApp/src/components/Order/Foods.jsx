import React from "react";

const Foods = ({ listMenuFood, search, HandleShowFoodDetails, setFoodCur }) => {
    return (
        <>
            {listMenuFood.map((food) => {
                if (food.nameFood.toLowerCase().includes(search.toLowerCase()))
                    return (
                        <div
                            className="ordering-menu-food"
                            onClick={() => {
                                HandleShowFoodDetails();
                                setFoodCur(food);
                            }}
                        >
                            <img
                                className="image-food"
                                src={food.pathImage}
                                alt={food.nameFood}
                            />
                            <div className="data-food">
                                <div className="description">
                                    <div className="name-food">
                                        {food.nameFood}
                                    </div>
                                    <div className="descrip">
                                        {food.categoryFood}
                                    </div>
                                </div>
                                <div className="price-food">
                                    {food.priceFood}đ
                                </div>
                            </div>
                        </div>
                    );
                else return <></>;
            })}
        </>
    );
};

export default Foods;
