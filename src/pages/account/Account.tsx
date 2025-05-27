import React, { useState } from "react";
import Sidebar from "./component/Sidebar";
import AccountInfo from "./component/AccountInfo";
import UpdateAccountPopup from "./component/UpdateAccountPopup";
import ChangePasswordPopup from "./component/ChangePasswordPopup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderHistory from "../OrderHistory"; // import phần lịch sử đơn hàng

const Account = () => {
    const [activeSection, setActiveSection] = useState("info");
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);

    const handleOpenUpdatePopup = () => {
        setShowUpdatePopup(true);
        setShowPasswordPopup(false);
    };

    const handleOpenPasswordPopup = () => {
        setShowPasswordPopup(true);
        setShowUpdatePopup(false);
    };

    const handleClosePopup = () => {
        setShowUpdatePopup(false);
        setShowPasswordPopup(false);
    };

    return (
        <>
            <Header />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar onSelectSection={setActiveSection} />
                <main className="flex-1 p-10">
                    {/* Hiển thị popup nếu cần */}
                    {showUpdatePopup && <UpdateAccountPopup onClose={handleClosePopup} />}
                    {showPasswordPopup && <ChangePasswordPopup onClose={handleClosePopup} />}

                    {/* Hiển thị nội dung tương ứng */}
                    {!showUpdatePopup && !showPasswordPopup && (
                        <>
                            {activeSection === "info" && (
                                <AccountInfo
                                    onUpdate={handleOpenUpdatePopup}
                                    onChangePassword={handleOpenPasswordPopup}
                                />
                            )}
                            {activeSection === "orders" && <OrderHistory />}
                            {activeSection === "favorites" && (
                                <div>Sản phẩm yêu thích (chưa làm)</div>
                            )}
                        </>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Account;
