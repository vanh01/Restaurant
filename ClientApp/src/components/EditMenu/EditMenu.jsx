import React from "react";
import listMenuFood from "../../listMenuFood";
import { useState } from "react";

const EditMenu = () => {
    const [Disable, setDisable] = useState("hide");
    const [NewDish, setNewDish] = useState(false);
    const [DishCurrent, setDishCurrent] = useState({});
    const [DishTemp, setDishTemp] = useState({});

    return (
        <>
            <div className="edit-menu">
                <div className="title">Products Management</div>
                <div className="line"></div>
                <div className="dishes">
                    <div
                        className="create-dish"
                        onClick={() => {
                            setDisable("hide hide1");
                            setNewDish(true);
                        }}
                    >
                        <i className="fas fa-plus"></i>
                        <p>Add new dish</p>
                    </div>
                    {listMenuFood.map((dish) => {
                        return (
                            <div className="dish">
                                <div className="dish-imgg">
                                    <img
                                        className="dish-img"
                                        src={dish.pathImage}
                                        alt={dish.nameFood}
                                    />
                                </div>
                                <div className="name-dish">{dish.nameFood}</div>
                                <div className="descrip-dish">
                                    {dish.description}
                                </div>
                                <div className="price-dish">
                                    {dish.priceFood}đ
                                </div>
                                <div
                                    className="edit-dish"
                                    onClick={() => {
                                        setDisable("hide hide1");
                                        setNewDish(false);
                                        setDishCurrent(dish);
                                        setDishTemp({
                                            nameFood: dish.nameFood,
                                            description: dish.description,
                                            priceFood: dish.priceFood,
                                            categoryFood: dish.categoryFood,
                                        });
                                    }}
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                    <p>Edit dish</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={Disable}
                onClick={() => {
                    setDisable("hide");
                    setDishCurrent({});
                }}
            ></div>
            {Disable !== "hide" ? (
                <div className="edit-info-dish">
                    <div className="edit-info-dish1">
                        <label>
                            <img
                                className="dish-img"
                                src={DishCurrent.pathImage}
                                alt={DishCurrent.nameFood}
                            />
                            <input type="file" name="Image" />
                            <i className="fas fa-file-image"></i>
                            <span>Select a image</span>
                        </label>
                    </div>
                    <div className="edit-info-dish2">
                        <input
                            type="text"
                            placeholder="Name"
                            defaultValue={DishCurrent.nameFood}
                            onChange={(e) =>
                                (DishTemp.nameFood = e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            defaultValue={DishCurrent.priceFood}
                            onChange={(e) =>
                                (DishTemp.priceFood = e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            defaultValue={DishCurrent.description}
                            onChange={(e) =>
                                (DishTemp.description = e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            defaultValue={DishCurrent.categoryFood}
                            onChange={(e) =>
                                (DishTemp.categoryFood = e.target.value)
                            }
                        />
                        {NewDish ? (
                            <></>
                        ) : (
                            <button
                                className="edit-info-dish2-delete"
                                onClick={() => {
                                    setDisable("hide");
                                    var index =
                                        listMenuFood.indexOf(DishCurrent);
                                    listMenuFood.splice(index, 1);
                                    console.log(index);
                                    console.log(listMenuFood);
                                    setDishCurrent({});
                                }}
                            >
                                Delete
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setDisable("hide");
                                if (NewDish) {
                                    listMenuFood.push(DishTemp);
                                } else {
                                    DishCurrent.nameFood = DishTemp.nameFood;
                                    DishCurrent.description =
                                        DishTemp.description;
                                    DishCurrent.priceFood = DishTemp.priceFood;
                                    DishCurrent.categoryFood =
                                        DishTemp.categoryFood;
                                }
                                setDishCurrent({});
                            }}
                        >
                            Save change
                        </button>
                    </div>
                    <i
                        className="fas fa-times-circle"
                        onClick={() => {
                            setDisable("hide");
                            setDishCurrent({});
                        }}
                    ></i>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default EditMenu;
