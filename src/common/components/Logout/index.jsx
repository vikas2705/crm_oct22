import { logout } from "../../utils/helper";

const Logout = () => {
    return (
        <button className='btn btn-danger' onClick={logout}>
            Logout
        </button>
    );
};

export default Logout;
