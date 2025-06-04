import React, {useState} from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Sidebar from "../dasboard/Sidebar";
import CouponForm from "./component/CouponForm";
import CouponList from "./component/CouponList";
import {Discount} from "../../../models/Discount";


function ManageCoupons() {
    const [coupons, setCoupons] = useState<Discount[]>([
        {id: "1", code: "SUMMER10", percent: 10, endDate: "2025-12-31"},
        {id: "2", code: "WELCOME5", percent: 5, endDate: "2025-06-30"},
    ]);

    // Thêm mã mới
    const addCoupon = (newCoupon: Omit<Discount, "id">) => {
        const id = coupons.length ? (parseInt(coupons[coupons.length - 1].id as string) + 1).toString() : "1";
        setCoupons([...coupons, { id, ...newCoupon }]);
    };

    // Xóa mã
    const deleteCoupon = (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa mã giảm giá này?")) {
            setCoupons(coupons.filter((c) => c.id !== id));
        }
    };

    // Cập nhật mã (nếu bạn làm sửa mã)
    const updateCoupon = (updated: Discount) => {
        setCoupons(coupons.map(c => c.id === updated.id ? updated : c));
    };

    return (
        <div>
            <Header/>
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar/>
                <main className="flex-1 p-6 space-y-6">
                    <CouponForm onAdd={addCoupon}/>
                    <CouponList coupons={coupons} onDelete={deleteCoupon} onUpdate={updateCoupon}/>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default ManageCoupons;
