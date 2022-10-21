import React from "react";
import BrowserHistory from "../../common/components/BrowserHistory";
import Logout from "../../common/components/Logout";

const Engineer = () => {
    return (
        <div>
            <h1> This is Engineer page</h1>
            <Logout />
            <BrowserHistory />
        </div>
    );
};

export default Engineer;
