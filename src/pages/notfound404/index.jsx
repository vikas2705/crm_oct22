import notFoundSvg from "../../common/assets/images/404.svg";
import { useNavigate } from "react-router-dom";
import "./notfound404.css";

const NotFound404 = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <div>
            <h1> Oops, page not found!</h1>
            <h3>
                Looks like you opened an invalid address. Please check and try
                again!!
            </h3>

            <div>
                <img src={notFoundSvg} alt='page not found' />
            </div>

            <button className='btn btn-info m-5' onClick={goBack}>
                Go Back
            </button>
        </div>
    );
};

export default NotFound404;
