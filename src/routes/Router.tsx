// src/components/Router.tsx
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../components/login/Login";


const Router = () => {
    return (
        <Routes>
            {/* Định nghĩa các route */}
            <Route path="/" element={<Login />} />
            {/*<Route path="/userlist" element={<UserList />} />*/}
            {/*<Route path="/userProfile" element={<UserProfile />} />*/}
            {/*<Route path="/category" element={<CategoryList />} />*/}

        </Routes>
    );
};

export default Router;
