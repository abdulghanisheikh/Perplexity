import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

const AppRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={ <h1>This is Home page</h1> }></Route>
            <Route path='/login' element={ <Login /> }></Route>
            <Route path='/register' element={ <Register /> }></Route>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;