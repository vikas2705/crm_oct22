import React, { useState } from "react";
import { registerUser } from "../../apis/auth";
import "./register.css";

const Register = props => {
    const { setAuthMode } = props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("CUSTOMER");
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
        setName(e.target.value);
    };
    const handleUserTypeChange = e => {
        setUserType(e.target.value);
    };

    const handleRegister = e => {
        e.preventDefault();

        const data = {
            userId,
            password,
            email,
            name,
            userType,
        };

        // api call to insert a new user
        try {
            registerUser(data)
                .then(resp => {
                    const { status } = resp;
                    if (status === 201) {
                        // if success, i will redirect the user to login page
                        setAuthMode("login");
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
        <div className='register-container'>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
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
                        type='text'
                        placeholder='enter username'
                        value={name}
                        onChange={handleUserNameChange}
                        required
                    />
                </div>
                <div className='form-container'>
                    <input
                        type='email'
                        placeholder='enter email'
                        value={email}
                        onChange={handleEmailChange}
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
                    <label>Select user type: </label>
                    <select
                        onChange={handleUserTypeChange}
                        required
                        value={userType}
                    >
                        <option value='ENGINEER'>Engineer</option>
                        <option value='CUSTOMER'>Customer</option>
                    </select>
                </div>
                <div className='form-container'>
                    <input
                        type='submit'
                        name='Register'
                        className='btn-primary'
                    />
                </div>
            </form>
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
