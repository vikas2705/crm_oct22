import React, { useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import { saveUserInformation } from "../../../../common/utils/helper";

const Login = props => {
    const { setAuthMode } = props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUserIdChange = e => {
        setUserId(e.target.value);
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleLogin = e => {
        e.preventDefault();
        const data = {
            userId,
            password,
        };

        // api call to send this data to server
        try {
            loginUser(data)
                .then(res => {
                    const { data, status } = res;
                    if (status === 200) {
                        const { userTypes } = data;
                        saveUserInformation(data);

                        // if success, i will redirect the user to correct user page
                        if (userTypes === "ENGINEER") {
                            navigate("/engineer");
                        } else if (userTypes === "CUSTOMER") {
                            navigate("/customer");
                        } else {
                            navigate("/admin");
                        }
                    }
                })
                .catch(err => {
                    // if failure, i will show an error
                    const errMsg = err?.response?.data?.message || err?.message;
                    setErrorMessage(errMsg);
                });
        } catch (err) {
            // if failure, i will show an error
            const errMsg = err?.response?.data?.message || err?.message;
            setErrorMessage(errMsg);
        }
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div className='form-container'>
                    <input
                        type='text'
                        placeholder='enter userId'
                        value={userId}
                        onChange={handleUserIdChange}
                        required
                    />
                </div>
                <div className='form-container'>
                    <input
                        type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className='form-container'>
                    <input type='submit' name='Login' className='btn-primary' />
                </div>
            </form>

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
