import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import UserProfile from '../components/user/UserProfile';
import CategoryList from '../components/user/CategoryList';
import Home from '../pages/home/Home';
import Register from "../pages/Regiter";
import ProductList from "../components/ProductList";

const Router = () => {
    return (
        <Routes>
            {/* Định nghĩa các route */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} /> {/* Đặt Home là mặc định */}
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/s" element={<ProductList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

        </Routes>
    );
};

export default Router;
