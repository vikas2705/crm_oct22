import axios from "axios";
const host = `${process.env.REACT_APP_BASE_URL}crm/api/v1`;

// function to create/register new user
export const registerUser = async data => {
    const postUrl = `${host}/auth/signup`;
    return await axios.post(postUrl, data, {
        headers: {
            "content-type": "application/json",
        },
    });
};

// function to login user
export const loginUser = async data => {
    const postUrl = `${host}/auth/signin`;
    return await axios.post(postUrl, data);
};
