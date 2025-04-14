// src/components/Router.tsx
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../components/login/Login";
import UserList from "../components/user/UserList";
import UserProfile from "../components/user/UserProfile";
import CategoryList from "../components/user/CategoryList";

const Router = () => {
    return (
        <Routes>
            {/* Định nghĩa các route */}
            <Route path="/" element={<Login />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/category" element={<CategoryList />} />

        </Routes>
    );
};

export default Router;
