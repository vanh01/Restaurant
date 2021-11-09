import React from "react";
import listMenuFood from "../../listMenuFood";

const EditMenu = () => {
    return (
        <>
            <div className="edit-menu">
                <div className="title">Products Management</div>
                <div className="line"></div>
                <div className="dishes">
                    <div className="create-dish">
                        <i class="fas fa-plus"></i>
                        <p>Add new dish</p>
                    </div>
                    {listMenuFood.map((food) => {
                        return (
                            <div className="dish">
                                <div className="dish-imgg">
                                    <img
                                        className="dish-img"
                                        src={food.pathImage}
                                        alt={food.nameFood}
                                    />
                                </div>
                                <div className="name-dish">{food.nameFood}</div>
                                <div className="descrip-dish">
                                    {food.description}
                                </div>
                                <div className="price-dish">
                                    {food.priceFood}đ
                                </div>
                                <div className="edit-dish">
                                    <i class="fas fa-pencil-alt"></i>
                                    <p>Edit dish</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default EditMenu;
