import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div className='sidebar-main bg-dark vh-100'>
            <h2 className='app-logo text-white'>
                <i className='bi bi-bar-chart-fill text-white m-2'></i>
                CRM
            </h2>
            <hr />

            <div className='sidebar-container'>
                <a href='/' className='sidebar-links'>
                    <i className='bi bi-house text-white m-2'></i>
                    Home
                </a>
            </div>

            <div className='sidebar-container'>
                <a href='#/' onClick={handleLogout} className='sidebar-links'>
                    <i className='bi bi-box-arrow-left text-white m-2'></i>
                    Logout
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
