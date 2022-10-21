import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrowserHistory from "../../common/components/BrowserHistory";
import Logout from "../../common/components/Logout";

const Customer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div>
            <h1> This is Customer page</h1>
            <Logout />
            <BrowserHistory />
        </div>
    );
};

export default Customer;
