import "./App.css";
import Authentication from "./pages/authentication";
import { Routes, Route } from "react-router-dom";
import Customer from "./pages/customer";
import Engineer from "./pages/engineer";
import Admin from "./pages/admin";
import NotFound404 from "./pages/notfound404";
import Unauthorized403 from "./pages/unauthorized403";
import RequireAuth from "./common/components/RequireAuth";
import { USER_TYPES } from "./common/constants/userTypes";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Authentication />} />
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[
                                USER_TYPES.CUSTOMER,
                                USER_TYPES.ADMIN,
                            ]}
                        />
                    }
                >
                    <Route path='/customer' element={<Customer />} />
                </Route>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[
                                USER_TYPES.ENGINEER,
                                USER_TYPES.ADMIN,
                            ]}
                        />
                    }
                >
                    <Route path='/engineer' element={<Engineer />} />
                </Route>
                <Route
                    element={<RequireAuth allowedRoles={[USER_TYPES.ADMIN]} />}
                >
                    <Route path='/admin' element={<Admin />} />
                </Route>
                <Route path='/unauthorized' element={<Unauthorized403 />} />
                <Route path='*' element={<NotFound404 />} />
            </Routes>
        </div>
    );
}

export default App;
