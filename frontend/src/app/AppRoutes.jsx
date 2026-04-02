import { Routes, Route, BrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from '../features/chat/pages/Dashboard';
import Protected from '../features/auth/components/Protected';
import {Navigate} from "react-router";

const AppRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Protected>
                <Dashboard />
            </Protected>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/dashboard' element={<Navigate to='/' />}></Route>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;