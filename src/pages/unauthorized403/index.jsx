import unauthorizedSvg from "../../common/assets/images/403.svg";
import { useNavigate } from "react-router-dom";
import "./unauthorized403.css";

const Unauthorized403 = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Unauthorized!!</h1>
            <h3>You don't have access to view this page</h3>
            <div>
                <img
                    src={unauthorizedSvg}
                    className='img-unauth'
                    alt='unauthorised access'
                />
            </div>

            <button className='btn btn-warning m-5' onClick={goBack}>
                Go Back
            </button>
        </div>
    );
};

export default Unauthorized403;
