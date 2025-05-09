import React from "react";

function Footer() {
    return (
        <footer className="bg-red-500 py-8 px-20 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {/* Cột 1 - Logo và ô nhập email */}
                <div className="flex flex-col space-y-4">
                    <div className="text-2xl font-semibold">Book Store</div>
                    <div className="text-sm">Theo dõi</div>
                    <div className="text-sm">Giảm 10% cho đơn hàng đầu tiên của bạn</div>
                    <div className="flex items-center border rounded-md p-2 w-full max-w-xs">
                        <input
                            className="focus:outline-none p-2 w-full bg-gray-100 rounded-l-lg"
                            placeholder="Nhập email của bạn"
                        />
                        <button className="text-white p-2 rounded-r-lg bg-blue-500 hover:bg-blue-600">
                            <i className="fas fa-chevron-right text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Cột 2 - Hỗ trợ */}
                <div className="text-sm space-y-2">
                    <div className="font-semibold">Hỗ trợ</div>
                    <div>30C/44, Biên Hòa 5, Đồng Nai</div>
                    <div>orangetech@gmail.com</div>
                    <div>1900 1003</div>
                </div>

                {/* Cột 3 - Tài khoản */}
                <div className="text-sm space-y-2">
                    <div className="font-semibold">Tài khoản</div>
                    <div>Tài khoản của tôi</div>
                    <div>Đăng nhập / Đăng ký</div>
                    <div>Giỏ hàng</div>
                    <div>Danh sách yêu thích</div>
                    <div>Cửa hàng</div>
                </div>

                {/* Cột 4 - Chính sách */}
                <div className="text-sm space-y-2">
                    <div className="font-semibold">Chính sách</div>
                    <div>Chính sách quyền riêng tư</div>
                    <div>Điều khoản sử dụng</div>
                    <div>Câu hỏi thường gặp</div>
                    <div>Liên hệ</div>
                </div>

                {/* Cột 5 - Mạng xã hội */}
                <div className="text-sm space-y-2">
                    <div className="font-semibold">Mạng xã hội</div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook-square text-xl"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter-square text-xl"></i></a>
                        <a href="#" className="hover:text-gray-300"><i className="fab fa-linkedin text-xl"></i></a>
                    </div>
                </div>
            </div>

            {/* Tải ứng dụng */}
            <div className="mt-8 flex justify-between items-center">
                <div className="flex space-x-4">
                    <div>Giảm 3$ cho người mới trên ứng dụng</div>
                    <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=vi" className="w-24" alt="Google Play" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" className="w-24" alt="App Store" />
                </div>
            </div>

            {/* Bản quyền */}
            <div className="mt-8 text-center text-sm">
                <p>© Copyright Rimel 2025. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
