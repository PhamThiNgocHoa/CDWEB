import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from '../pages/Login';
import CategoryList from '../components/user/CategoryList';
import Home from '../pages/home/Home';
import Register from "../pages/Regiter";
import ProductList from "../components/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Checkout from "../pages/checkout/Checkout";
import OrderHistory from "../pages/OrderHistory";
import OrderDetail from "../pages/OrderDetail";
import ForgotPassword from "../pages/FogotPassword";
import ResetPassword from "../pages/ResetPassword";
import Account from "../pages/account/Account";
import PaymentReturn from "../pages/checkout/PaymentReturn";
import Administration from "../pages/admin/dasboard/Administration";
import Header from "../components/Header";
import ManageCategories from "../pages/admin/categories/ManageCategories";
import ManageCoupons from "../pages/admin/discount/ManageCoupons";
import ManageOrders from "../pages/admin/order/ManageOrders";
import ManageProducts from "../pages/admin/product/ManageProducts";
import ManageUser from "../pages/admin/user/ManageUser";
import OAuth2Redirect from "../pages/OAuth2Redirect";

const Router = () => {
    return (

        <Routes>
            {/* Định nghĩa các route */}
            {/*    user*/}
            <Route path="/home" element={<Home/>}/>
            <Route path="/" element={<Home/>}/> {/* Đặt Home là mặc định */}
            <Route path="/category" element={<CategoryList/>}/>
            <Route path="/s" element={<ProductList/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/productDetail/:id" element={<ProductDetail/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/searchProduct" element={<SearchProduct/>}/>
            <Route path="/searchProduct/:name" element={<SearchProduct/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/orderHistory/:userId" element={<OrderHistory/>}/>
            <Route path="/orderDetail/:orderId" element={<OrderDetail/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password/:username" element={<ResetPassword/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/payment-return" element={<PaymentReturn/>}/>
            <Route path="/oauth2/redirect" element={<OAuth2Redirect/>}/>


            {/*    admin*/}
            <Route path="/administration" element={<Administration/>}/>
            <Route path="/manageCategories" element={<ManageCategories/>}/>
            <Route path="/manageCoupons" element={<ManageCoupons/>}/>
            <Route path="/manageOrders" element={<ManageOrders/>}/>
            <Route path="/manageProducts" element={<ManageProducts/>}/>
            <Route path="/manageUser" element={<ManageUser/>}/>


        </Routes>
    );
};

export default Router;
