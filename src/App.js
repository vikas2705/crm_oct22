import "./App.css";
import Authentication from "./pages/authentication";
import { Routes, Route } from "react-router-dom";
import Customer from "./pages/customer";
import Engineer from "./pages/engineer";
import Admin from "./pages/admin";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Authentication />} />
                <Route path='/customer' element={<Customer />} />
                <Route path='/engineer' element={<Engineer />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </div>
    );
}

export default App;
