import { useNavigate } from "react-router-dom";

const BrowserHistory = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    return (
        <div>
            <div>
                <button className='btn btn-info' onClick={goBack}>
                    Go Back
                </button>
            </div>
            <div>
                <button className='btn btn-secondary' onClick={goForward}>
                    Go Forward
                </button>
            </div>
        </div>
    );
};

export default BrowserHistory;
