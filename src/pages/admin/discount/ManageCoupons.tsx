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
            <div className="flex min-h-screen bg-gray-100">
                {notification && (
                    <Notification message={notification.message} type={notification.type}
                                  onClose={() => setNotification(null)}/>
                )}
                <Sidebar/>
                <main className="flex-1 p-6 space-y-6">
                    <CouponForm onAdd={handleAddDiscount}/>
                    <CouponList coupons={coupons} onDelete={handleDelete} onUpdate={saveEdit}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default ManageCoupons;
