import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faReceipt, faSignOut, faUser, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import IconTextItem from "./IconTextItem";
import {useAuth} from "../hooks/useAuth";
import {Link} from "react-router-dom";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // Quản lý việc mở/đóng menu
    const {isLoggedIn, handleLogout, setIsLoggedIn} = useAuth();  // Lấy trạng thái đăng nhập và hàm đăng xuất từ useAuth hook

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);  // Lật trạng thái của menu khi click
    };
    return (
        <header>
            <div className="w-full h-full hidden xl:flex">
                <img src="/image/image1.png"/>
            </div>
            <div className="w-full py-4 px-4 md:px-10 lg:px-20 flex justify-between items-center">
                {/* Logo */}
                <div className="logo flex-shrink-0">
                    <img
                        className="w-38 h-10"
                        src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                        alt="Logo"
                    />
                </div>

                {/* Ô tìm kiếm */}
                <div
                    className="flex items-center flex-grow mx-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border rounded-md h-12">
                    <input type="text" placeholder="Tìm kiếm..."
                           className="w-full p-2 focus:outline-none text-sm sm:text-base"/>
                    <button className="bg-red-500 text-white rounded-lg p-2 ml-2 hover:bg-red-300 focus:outline-none">
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                {/* Nav icons */}
                <div className="nav flex text-xl text-gray-500 space-x-2 mr-20">
                    {/* Giỏ hàng */}
                    <Link to="/cart">
                        <div className="flex flex-col items-center justify-center cursor-pointer px-2 group">
                            <FontAwesomeIcon className="text-gray-500 group-hover:text-red-500" icon={faShoppingCart}/>
                            <p className="text-xs hidden lg:flex group-hover:text-red-500">Giỏ hàng</p>
                        </div>
                    </Link>
                    {/* Tài khoản */}
                    <div className="relative flex flex-col items-center cursor-pointer hover:text-red-500 px-4"
                         onClick={toggleMenu}>
                        <div className="flex flex-col items-center justify-center cursor-pointer px-2 group">
                            <FontAwesomeIcon className="text-gray-500 group-hover:text-red-500" icon={faUser}/>
                            <p className="text-xs hidden lg:flex group-hover:text-red-500">Tài khoản</p>
                        </div>
                        {isMenuOpen && (
                            <div
                                className="absolute z-50 text-sm text-gray-400 bg-white border rounded-md shadow-lg mt-10 py-2 w-72">
                                {/* Hiển thị nội dung khi đã đăng nhập */}
                                {isLoggedIn ? (
                                    <>
                                        <IconTextItem icon={faUser} text="Thành viên Book Store"/>
                                        <IconTextItem icon={faReceipt} text="Đơn hàng của tôi"/>
                                        <IconTextItem icon={faHeart} text="Thành viên Book Store"/>
                                        <div onClick={handleLogout}>
                                            <IconTextItem icon={faSignOut} text="Thoát"/>
                                        </div>
                                    </>
                                ) : (
                                    // Hiển thị nội dung khi chưa đăng nhập
                                    <>
                                        <a href="/login">
                                            <IconTextItem icon={faUser} text="Đăng nhập"/>
                                        </a>
                                        <a href="/register">
                                            <IconTextItem icon={faSignOut} text="Đăng ký"/>
                                        </a>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center border border-gray-600 rounded-md px-2 flex-shrink-0">
                        <img className="w-8 h-6 object-cover flex-shrink-0"
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
