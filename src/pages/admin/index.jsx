import React from "react";
import BrowserHistory from "../../common/components/BrowserHistory";
import Logout from "../../common/components/Logout";

const Admin = () => {
    return (
        <div>
            <h1> This is Admin page</h1>
            <Logout />
            <BrowserHistory />
        </div>
    );
};

export default Admin;
