import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar-new.css";
import {
    CSidebar,
    CSidebarNav,
    CNavTitle,
    CNavItem,
    CSidebarBrand,
} from "@coreui/react";

const SidebarNew = props => {
    const { home } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <CSidebar unfoldable className='vh-100 bg-black'>
            <CSidebarNav>
                <CSidebarBrand href='/admin' className='bg-dark'>
                    <div>
                        <i className='bi bi-bar-chart-fill text-white m-2'></i>
                        <br />
                        <h5 className='text-white mx-3  my-1 fw-bolder'>CRM</h5>
                    </div>
                </CSidebarBrand>
                <CNavTitle className='text-light fw-normal'>
                    A CRM app for all your needs.
                </CNavTitle>

                <CNavItem href={home}>
                    <i className='bi bi-house text-white m-2'></i>
                    <span className='text-decoration-none text-white mx-3'>
                        Home
                    </span>
                </CNavItem>

                <CNavItem href='#/' onClick={handleLogout}>
                    <i className='bi bi-box-arrow-left text-white m-2'></i>
                    <span className='text-decoration-none text-white mx-3'>
                        Logout
                    </span>
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    );
};

export default SidebarNew;
