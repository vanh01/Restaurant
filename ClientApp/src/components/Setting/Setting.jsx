import React from "react";
import "../../css/setting.css";

const Setting = ({ User }) => {
    return (
        <>
            <div className="setting">
                <div className="settingg">
                    <div className="setting-info">
                        <div>
                            First name
                            <input type="text" defaultValue={User.fName} />
                        </div>
                        <div>
                            Last name
                            <input type="text" defaultValue={User.lName} />
                        </div>
                        <div>
                            Date of birth
                            <input
                                type="date"
                                className="date-of-birth"
                                onChange={(e) => {
                                    console.log(typeof e.target.value);
                                    console.log(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            Address
                            <input type="text" defaultValue={User.address} />
                        </div>
                        <div>
                            Phone number
                            <input
                                type="text"
                                defaultValue={User.phoneNumber}
                            />
                        </div>
                        <button>Save changes</button>
                        <button>Dismiss</button>
                    </div>
                    <div className="setting-password">
                        <div>
                            Username
                            <input
                                readOnly
                                type="text"
                                defaultValue={User.userName}
                            />
                        </div>
                        <div>
                            Current password
                            <input
                                type="password"
                                defaultValue={User.password}
                            />
                        </div>
                        <div>
                            New password
                            <input type="password" />
                        </div>
                        <div>
                            Confirm password
                            <input type="password" />
                        </div>
                        <button>Change password</button>
                        <button>Dismiss</button>
                    </div>
                </div>
                <div className="setting-avatar">
                    <div className="title">Profile picture</div>
                    <div className="picture"></div>
                    <label className="edit">
                        <input type="file" />
                        <i className="fas fa-pen"></i>Edit
                    </label>
                </div>
            </div>
        </>
    );
};

export default Setting;
