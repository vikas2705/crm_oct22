import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Customer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div>
            <h1> This is Customer page</h1>
            <button className='btn btn-danger' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Customer;
