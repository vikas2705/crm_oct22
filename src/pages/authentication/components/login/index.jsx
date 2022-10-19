import React, { useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";

const Login = props => {
    const { setAuthMode } = props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUserIdChange = e => {
        setUserId(e.target.value);
    };
    const handlePasswordhange = e => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const data = {
            userId,
            password,
        };

        console.log(data);

        navigate("/engineer");

        // api call to send this data to server

        // if the api response is a success -> we will redirect user to
        //home / dashboard page

        // if api is failed, we need to show an error to user

        /* if (error) {
            setErrorMessage(error);
        } */
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>

            <div className='form-container'>
                <input
                    type='text'
                    placeholder='enter userId'
                    value={userId}
                    onChange={handleUserIdChange}
                />
            </div>
            <div className='form-container'>
                <input
                    type='password'
                    placeholder='enter password'
                    value={password}
                    onChange={handlePasswordhange}
                />
            </div>
            <div className='form-container'>
                <button className='btn-primary' onClick={handleLogin}>
                    Login
                </button>
            </div>

            <div className='form-container'>
                <span>
                    Don't have an account?
                    <a
                        href='#/'
                        onClick={() => {
                            setAuthMode("register");
                        }}
                    >
                        Signup
                    </a>
                </span>
            </div>

            {errorMessage && (
                <div className='error-section'>{errorMessage}</div>
            )}

            <div>
                <NavLink to='/customer'>Go to customer page</NavLink>
            </div>
            <div>
                <NavLink to='/admin'>Go to Admin page</NavLink>
            </div>
        </div>
    );
};

export default Login;
