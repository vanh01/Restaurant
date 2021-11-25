import React, { useEffect } from "react";
import "../../css/edit-menu.css";
// import listMenuFood from "../../data/listMenuFood";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditMenu = () => {
    const [Disable, setDisable] = useState("hide");
    const [NewDish, setNewDish] = useState(false);
    const [DishCurrent, setDishCurrent] = useState({});
    const [DishTemp, setDishTemp] = useState({});
    const [listMenuFood, setlistMenuFood] = useState([{}]);

    const notify = () => {
        toast.success("Success!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const notify1 = () => {
        toast.error("Fail!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const GetAllFoods = async () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        await fetch("https://localhost:5001/api/food", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setlistMenuFood(result);
            })
            .catch((error) => console.log("error", error));
    };

    const InsertFood = async () => {
        var formdata = new FormData();
        formdata.append("file", DishTemp.file);
        formdata.append("Name", DishTemp.name);
        formdata.append("Description", DishTemp.description);
        formdata.append("Price", DishTemp.price);
        formdata.append("Category", DishTemp.category);

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        await fetch(
            "https://localhost:5001/api/food?userName=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") {
                    notify();
                    setDisable("hide");
                } else notify1();
            })
            .catch((error) => console.log("error", error));
    };

    const UpdateFood = async () => {
        var formdata = new FormData();
        formdata.append("FoodID", DishCurrent.foodID);
        if (DishTemp.file) formdata.append("file", DishTemp.file);
        formdata.append("Name", DishTemp.name);
        formdata.append("Description", DishTemp.description);
        formdata.append("Price", DishTemp.price);
        formdata.append("Category", DishTemp.category);

        var requestOptions = {
            method: "PUT",
            body: formdata,
            redirect: "follow",
        };

        await fetch(
            "https://localhost:5001/api/food?userName=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") {
                    notify();
                } else notify1();
            })
            .catch((error) => console.log("error", error));
    };

    const DeleteFood = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            foodID: DishCurrent.foodID,
        });

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/food?userName=" +
                localStorage.getItem("userName") +
                "&password=" +
                localStorage.getItem("password"),
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                if (result === "Success") {
                    notify();
                    var index = listMenuFood.indexOf(DishCurrent);
                    listMenuFood.splice(index, 1);
                    setDishCurrent({});
                } else notify1();
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        GetAllFoods();
    }, []);
    console.log("hi");
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
                    {listMenuFood.map((dish, index) => {
                        return (
                            <div className="dish" key={index}>
                                <div className="dish-imgg">
                                    <img
                                        className="dish-img"
                                        // src={dish.pathImg}
                                        src={
                                            "https://localhost:5001/Images/" +
                                            dish.pathImg
                                        }
                                        alt={dish.name}
                                    />
                                </div>
                                <div className="name-dish">{dish.name}</div>
                                <div className="descrip-dish">
                                    {dish.description}
                                </div>
                                <div className="price-dish">{dish.price}</div>
                                <div
                                    className="edit-dish"
                                    onClick={() => {
                                        setDisable("hide hide1");
                                        setNewDish(false);
                                        setDishCurrent(dish);
                                        setDishTemp({
                                            name: dish.name,
                                            description: dish.description,
                                            price: dish.price,
                                            category: dish.category,
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
                <ToastContainer />
            </div>
            <div
                className={Disable}
                onClick={() => {
                    setDisable("hide");
                    setDishCurrent({});
                }}
            ></div>
            {Disable !== "hide" && (
                <form
                    className="edit-info-dish"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (NewDish) {
                            if (!DishTemp.file) {
                                notify1();
                                return;
                            }
                            await InsertFood();
                            await GetAllFoods();
                        } else {
                            await UpdateFood();
                            await GetAllFoods();
                            // DishCurrent.name = DishTemp.name;
                            // DishCurrent.description = DishTemp.description;
                            // DishCurrent.price = DishTemp.price;
                            // DishCurrent.category = DishTemp.category;
                        }
                        setDisable("hide");
                        setDishCurrent({});
                    }}
                >
                    <div className="edit-info-dish1">
                        <img
                            className="dish-img"
                            src={
                                DishTemp.file
                                    ? DishTemp.imagePath
                                    : "https://localhost:5001/Images/" +
                                      DishCurrent.pathImg
                            }
                            alt={DishCurrent.name}
                        />
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                name="Image"
                                onChange={(e) => {
                                    DishTemp.file = e.target.files[0];
                                    var reader = new FileReader();
                                    reader.onload = (e) => {
                                        setDishTemp({
                                            ...DishTemp,
                                            imagePath: e.target.result,
                                        });
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }}
                            />
                            <span>
                                {DishTemp.file
                                    ? DishTemp.file.name
                                    : "Select a image"}
                            </span>
                        </label>
                    </div>
                    <div className="edit-info-dish2">
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            defaultValue={DishCurrent.name}
                            onChange={(e) =>
                                setDishTemp({
                                    ...DishTemp,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            required
                            placeholder="Price"
                            defaultValue={DishCurrent.price}
                            onChange={(e) =>
                                setDishTemp({
                                    ...DishTemp,
                                    price: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            required
                            placeholder="Description"
                            defaultValue={DishCurrent.description}
                            onChange={(e) =>
                                setDishTemp({
                                    ...DishTemp,
                                    description: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            required
                            placeholder="Category"
                            defaultValue={DishCurrent.category}
                            onChange={(e) =>
                                setDishTemp({
                                    ...DishTemp,
                                    category: e.target.value,
                                })
                            }
                        />
                        {!NewDish && (
                            <button
                                className="edit-info-dish2-delete"
                                onClick={() => {
                                    DeleteFood();
                                    setDisable("hide");
                                }}
                            >
                                Delete
                            </button>
                        )}
                        <button type="submit">Save change</button>
                    </div>
                    <i
                        className="fas fa-times-circle"
                        onClick={() => {
                            setDisable("hide");
                            setDishCurrent({});
                        }}
                    ></i>
                </form>
            )}
        </>
    );
};

export default EditMenu;
