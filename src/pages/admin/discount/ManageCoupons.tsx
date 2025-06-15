import React, {useEffect, useState} from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Sidebar from "../dasboard/Sidebar";
import CouponForm from "./component/CouponForm";
import CouponList from "./component/CouponList";
import Notification from "../../../components/Notification";
import {useDiscount} from "../../../hooks/useDiscount";


function ManageCoupons() {
    const {coupons, handleAddDiscount, notification, setNotification, handleDelete, saveEdit} = useDiscount();
    return (
        <div>
            <Header/>
            <div className="flex min-h-screen bg-gray-100 mt-32">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
                <div
                    className="w-64 hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-40 bg-white shadow-lg">
                    <Sidebar/>
                </div>
                <main className="flex-1 ml-0 md:ml-64 p-6 pt-[100px] py-16">
                    <CouponForm onAdd={handleAddDiscount}/>
                    <CouponList coupons={coupons} onDelete={handleDelete} onUpdate={saveEdit}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default ManageCoupons;
