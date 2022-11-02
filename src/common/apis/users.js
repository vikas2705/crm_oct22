import axios from "axios";
const host = `${process.env.REACT_APP_BASE_URL}crm/api/v1`;

export const fetchUsers = async () => {
    return await axios.get(
        `${host}/users/`,
        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        },
        {
            userId: localStorage.getItem("userId"),
        }
    );
};
