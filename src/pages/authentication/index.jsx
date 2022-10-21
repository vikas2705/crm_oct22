import React, { useEffect, useState } from "react";
import Login from "./components/login";
import Register from "./components/register";
import "./authentication.css";
import { useNavigate } from "react-router-dom";
import { USER_TYPES } from "../../common/constants/userTypes";

const Authentication = () => {
    const [authMode, setAuthMode] = useState("login");
    const navigate = useNavigate();

    useEffect(() => {
        // if user is already logged in , take them back to their dashboard
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            // if accesstoken exists, find the usertype and send user back to his page
            const userTypes = localStorage.getItem("userTypes");
            if (userTypes === USER_TYPES.ENGINEER) {
                navigate("/engineer");
            } else if (userTypes === USER_TYPES.CUSTOMER) {
                navigate("/customer");
            } else {
                navigate("/admin");
            }
        }
    }, [navigate]);

    return (
        <div className='auth'>
            {authMode === "login" && <Login setAuthMode={setAuthMode} />}

            {authMode !== "login" && <Register setAuthMode={setAuthMode} />}
        </div>
    );
};

export default Authentication;
