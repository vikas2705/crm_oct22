import axios from "axios";
const host = `${process.env.REACT_APP_BASE_URL}crm/api/v1`;

export const fetchCreatedTickets = async () => {
    return await axios.get(
        `${host}/tickets/`,
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