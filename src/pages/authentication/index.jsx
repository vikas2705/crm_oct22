import React, { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";
import "./authentication.css";

const Authentication = () => {
    const [authMode, setAuthMode] = useState("login");

    return (
        <div className='auth'>
            {authMode === "login" && <Login setAuthMode={setAuthMode} />}

            {authMode !== "login" && <Register setAuthMode={setAuthMode} />}
        </div>
    );
};

export default Authentication;
