import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import UserProfile from '../components/user/UserProfile';
import CategoryList from '../components/user/CategoryList';
import Home from '../pages/home/Home';
import Register from "../pages/Regiter";
import ProductList from "../components/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import SearchProduct from "../pages/SearchProduct";
import Checkout from "../pages/Checkout";

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
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/searchProduct/:name" element={<SearchProduct />} />
            <Route path="/checkout" element={<Checkout />} />








        </Routes>
    );
};

export default Router;
