import React, { useState } from "react";
import { registerUser } from "../../apis/auth";
import "./register.css";
import { USER_TYPES } from "../../../../common/constants/userTypes";
import Loader from "../../../../common/components/Loader";

const Register = props => {
    const { setAuthMode } = props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState(USER_TYPES.CUSTOMER);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
                        setLoading(false);
                        setAuthMode("login");
                    }
                })
                .catch(err => {
                    // if failure, i will show an error
                    const errMsg = err?.response?.data?.message || err?.message;
                    setErrorMessage(errMsg);
                    setLoading(false);
                });
        } catch (err) {
            // if failure, i will show an error
            const errMsg = err?.response?.data?.message || err?.message;
            setErrorMessage(errMsg);
            setLoading(false);
        }
    };

    return (
        <div className='register-container'>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h1 className='m-5'>Register</h1>

                    <form onSubmit={handleRegister}>
                        <div className='form-container form-group'>
                            <input
                                type='text'
                                placeholder='enter userId'
                                value={userId}
                                onChange={handleUserIdChange}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='form-container'>
                            <input
                                type='text'
                                placeholder='enter username'
                                value={name}
                                onChange={handleUserNameChange}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='form-container'>
                            <input
                                type='email'
                                placeholder='enter email'
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='form-container'>
                            <input
                                type='password'
                                placeholder='enter password'
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='form-container'>
                            <label>Select user type: </label>
                            <select
                                onChange={handleUserTypeChange}
                                required
                                value={userType}
                                className='form-control'
                            >
                                <option value={USER_TYPES.ENGINEER}>
                                    Engineer
                                </option>
                                <option value={USER_TYPES.CUSTOMER}>
                                    Customer
                                </option>
                            </select>
                        </div>
                        <div className='form-container'>
                            <input
                                type='submit'
                                name='Register'
                                className='btn btn-primary'
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
                        <div className='text-danger'>{errorMessage}</div>
                    )}
                </>
            )}
        </div>
    );
};

export default Register;
