import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faReceipt, faSignOut, faUser, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import IconTextItem from "./IconTextItem";
import {useAuth} from "../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import useProduct from "../hooks/useProduct"; // Hook fetch sản phẩm
import {ProductResponse} from "../models/response/ProductResponse"; // Kiểu dữ liệu sản phẩm
import Notification from "./Notification";
import useCustomer from "../hooks/useCustomer";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ProductResponse[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const {user} = useCustomer();

    const {isLoggedIn, handleLogout, setIsLoggedIn} = useAuth();
    const {fetchListFindByName} = useProduct();
    const navigate = useNavigate();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState<"success" | "error">("success");

    const showErrNotification = (message: string) => {
        setNotificationMessage(message);
        setNotificationType("error");
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [setIsLoggedIn]);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const result = await fetchListFindByName(query);
            setSuggestions(result);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handClick = () => {
        if (searchQuery.trim() !== "") {
            navigate(`/searchProduct/${encodeURIComponent(searchQuery)}`);
            setShowSuggestions(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseSuggestions = () => {
        setShowSuggestions(false);
    };

    return (
        <header>
            <div className="w-full h-full hidden xl:flex">
                <img src="/image/image1.png" alt="Banner"/>
            </div>

            <div className="w-full py-4 px-4 md:px-10 lg:px-20 flex justify-between items-center">
                {/* Logo */}
                <Link to="/home">
                    <div className="logo flex-shrink-0">
                        <img
                            className="w-38 h-10"
                            src="https://cdn1.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                            alt="Logo"
                        />
                    </div>
                </Link>

                {/* Ô tìm kiếm */}
                <div
                    className="flex items-center flex-grow mx-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border rounded-md h-12 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm..."
                        className="w-full p-2 focus:outline-none text-sm sm:text-base"
                    />
                    <button
                        className="bg-red-500 text-white rounded-lg p-2 ml-2 hover:bg-red-300 focus:outline-none"
                        onClick={handClick}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                    {/* Nút đóng gợi ý */}
                    {showSuggestions && (
                        <button
                            onClick={handleCloseSuggestions}
                            className="absolute top-10 bottom-10 right-2 z-[9999] text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Đóng gợi ý"
                        >
                            ✕
                        </button>
                    )}


                    {/* Hiển thị gợi ý tìm kiếm */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div
                            className="absolute top-14 left-0 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                            {suggestions.map((product: ProductResponse) => (
                                <div key={product.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                                    <Link to={`/productDetail/${product.id}`} className="flex items-center">
                                        <img
                                            className="w-12 h-12 object-cover mr-2"
                                            src={product.img}
                                            alt={product.name}
                                        />
                                        <span>{product.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Nav icons */}
                <div className="nav flex text-xl text-gray-500 space-x-2 mr-20">
                    {/* Giỏ hàng */}
                    <Link to="/cart">
                        <div className="flex flex-col items-center justify-center cursor-pointer px-2 group">
                            <FontAwesomeIcon
                                className="text-gray-500 group-hover:text-red-500"
                                icon={faShoppingCart}
                            />
                            <p className="text-xs hidden lg:flex group-hover:text-red-500">Giỏ hàng</p>
                        </div>
                    </Link>

                    {/* Tài khoản */}
                    <div
                        className="relative flex flex-col items-center cursor-pointer hover:text-red-500 px-4"
                        onClick={toggleMenu}
                    >
                        <div className="flex flex-col items-center justify-center cursor-pointer px-2 group">
                            <FontAwesomeIcon className="text-gray-500 group-hover:text-red-500" icon={faUser}/>
                            <p className="text-xs hidden lg:flex group-hover:text-red-500">Tài khoản</p>
                        </div>
                        {isMenuOpen && (
                            <div
                                className="absolute z-50 text-sm text-gray-400 bg-white border rounded-md shadow-lg mt-10 py-2 w-72">
                                {/* Nội dung menu khi đã đăng nhập */}
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/account">
                                            <IconTextItem icon={faUser} text="Thành viên Book Store"/>
                                        </Link>
                                        <Link to={`/orderHistory/${user?.id}`}>
                                            <IconTextItem icon={faReceipt} text="Đơn hàng của tôi"/>
                                        </Link>
                                        {user?.role === "ADMIN" && (
                                            <Link to="/administration">
                                                <IconTextItem icon={faHeart} text="Quản trị"/>
                                            </Link>
                                        )}
                                        <div onClick={handleLogout}>
                                            <IconTextItem icon={faSignOut} text="Thoát"/>
                                        </div>
                                    </>
                                ) : (
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

                    {/* Cờ Việt Nam */}
                    <div className="flex items-center border border-gray-600 rounded-md px-2 flex-shrink-0">
                        <img
                            className="w-8 h-6 object-cover flex-shrink-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                            alt="Vietnam Flag"
                        />
                    </div>
                </div>
            </div>

            {showNotification && (
                <Notification
                    message={notificationMessage}
                    type={notificationType}
                    onClose={() => setShowNotification(false)}
                />
            )}
        </header>
    );
}

export default Header;
