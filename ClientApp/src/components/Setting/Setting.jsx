import React from "react";
import "../../css/setting.css";

const Setting = () => {
    return (
        <>
            <div className="setting">
                <div className="settingg">
                    <div className="setting-info">
                        <div>
                            First name
                            <input type="text" />
                        </div>
                        <div>
                            Last name
                            <input type="text" />
                        </div>
                        <div>
                            Date of birth
                            <input type="date" className="date-of-birth" onChange={(e)=>{console.log(typeof e.target.value); console.log(e.target.value)}} />
                        </div>
                        <div>
                            Address
                            <input type="text" />
                        </div>
                        <div>
                            Phone number
                            <input type="text" />
                        </div>
                        <button>Save changes</button>
                        <button>Dismiss</button>
                    </div>
                    <div className="setting-password">
                        <div>
                            Username
                            <input readOnly type="text" />
                        </div>
                        <div>
                            Current password
                            <input type="password" />
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
                    <button className="edit">
                        <i class="fas fa-pen"></i>Edit
                    </button>
                </div>
            </div>
        </>
    );
};

export default Setting;
