import React, { useState } from "react";
import "./register.css";

const Register = props => {
    const { setAuthMode } = props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUserIdChange = e => {
        setUserId(e.target.value);
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };
    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const handleUserNameChange = e => {
        setUserName(e.target.value);
    };

    const handleRegister = () => {
        const data = {
            userId,
            password,
            email,
            userName,
        };

        console.log(data);

        // api call to insert a new user

        // if success, i will redirect the user to login page

        // if failure, i will show an error
    };

    return (
        <div className='register-container'>
            <h1>Register</h1>

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
                    type='text'
                    placeholder='enter username'
                    value={userName}
                    onChange={handleUserNameChange}
                />
            </div>
            <div className='form-container'>
                <input
                    type='email'
                    placeholder='enter email'
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className='form-container'>
                <input
                    type='password'
                    placeholder='enter password'
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className='form-container'>
                <button className='btn-primary' onClick={handleRegister}>
                    Register
                </button>
            </div>
            <div className='form-container'>
                <span>
                    Already have an account?
                    <a
                        href='#/'
                        onClick={() => {
                            setAuthMode("login");
                        }}
                    >
                        Login
                    </a>
                </span>
            </div>

            {errorMessage && (
                <div className='error-section'>{errorMessage}</div>
            )}
        </div>
    );
};

export default Register;
