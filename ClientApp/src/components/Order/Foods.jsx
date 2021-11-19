import React from "react";

const Foods = ({
    listMenuFood,
    search,
    HandleShowFoodDetails,
    setFoodCur,
    Category,
}) => {
    console.log(listMenuFood);
    return (
        <>
            {listMenuFood.map((food, index) => {
                if (typeof food.name !== "undefined") {
                    if (food.category === Category || Category === "Category") {
                        if (
                            food.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                            return (
                                <div
                                    key={index}
                                    className="ordering-menu-food"
                                    onClick={() => {
                                        HandleShowFoodDetails();
                                        setFoodCur(food);
                                    }}
                                >
                                    <div className="image-food-d">
                                        <img
                                            className="image-food"
                                            src={food.pathImg}
                                            alt={food.name}
                                        />
                                    </div>
                                    <div className="data-food">
                                        <div className="description">
                                            <div className="name-food">
                                                {food.name}
                                            </div>
                                            <div className="descrip">
                                                {food.description}
                                            </div>
                                        </div>
                                        <div className="price-food">
                                            {food.price}đ
                                        </div>
                                    </div>
                                </div>
                            );
                    }
                }
            })}
        </>
    );
};

export default Foods;
