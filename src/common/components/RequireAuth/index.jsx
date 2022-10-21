import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = props => {
    const { allowedRoles } = props;
    const currentUserType = localStorage.getItem("userTypes");

    // case 1:
    //allowedRoles and currentUserType are same
    // open the page as normal
    if (allowedRoles.includes(currentUserType)) {
        return <Outlet />;
    }

    // case 2: allowedRoles and currentUserType are not same

    //Case 2.A if user is logged in or not
    // if currentUserType is empty, user is not loggedin
    // navigate the user to login page

    if (!currentUserType) {
        return <Navigate to='/' />;
    }

    //Case 2.B if user is logged in
    // if currentUserType is not empty, user is loggedin
    // navigate the user to unauthorized page
    return <Navigate to='/unauthorized' />;
};

export default RequireAuth;
